import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { 
      product, 
      target_country, 
      gtip_code, 
      keywords, 
      competitors, 
      customers, 
      sales_channels,
      contact_name,
      // Legacy support for contact submissions
      productCategory, 
      targetCountries, 
      company, 
      notes 
    } = await request.json();

    // Determine if this is a conversation/form submission or contact submission
    const isConversation = product && target_country;
    
    let finalProduct, finalCountries, finalCompany, finalNotes;
    
    if (isConversation) {
      // Handle conversation/form submission data
      finalProduct = product;
      finalCountries = target_country;
      finalCompany = contact_name || 'Unknown Company';
      finalNotes = `GTIP Code: ${gtip_code || 'N/A'}
Sales Channels: ${Array.isArray(sales_channels) ? sales_channels.join(', ') : sales_channels || 'N/A'}
Existing Keywords: ${Array.isArray(keywords) ? keywords.join(', ') : keywords || 'N/A'}
Competitors: ${competitors || 'N/A'}
Customers: ${customers || 'N/A'}`;
    } else {
      // Handle contact submission data (legacy)
      finalProduct = productCategory;
      finalCountries = targetCountries;
      finalCompany = company;
      finalNotes = notes;
    }

    if (!finalProduct || !finalCountries) {
      return NextResponse.json(
        { error: 'Product and target country are required' },
        { status: 400 }
      );
    }

    // Parse target countries (could be comma-separated)
    const countries = finalCountries.split(',').map((c: string) => c.trim());
    const primaryCountry = countries[0];

    // Create the revised prompt based on the new template
    const prompt = `Revised AI Character Prompt: B2B Search Query Generator

Role: AI that interprets the business from form data to generate targeted Google search queries using advanced parameters.

Core Instruction: Use all provided form data to comprehend the business model before identifying targets.

Process:

1. Business Interpretation:
   - Analyze "Existing Keywords" to deduce the company's role (e.g., manufacturer, supplier) and market focus.
   - Cross-reference with "Sales Channels" to understand distribution logic.
   - Review "Competitors" and "Customers" data (e.g., websites, names) if provided to identify market patterns, similar entities, or gaps.

2. Target Deduction: Based on business interpretation, identify probable B2B partners (e.g., distributors, importers).

3. Query Generation: Formulate 3 search queries using advanced Google operators (e.g., site:, intitle:, country-specific domains) tailored to the target country and business context.

Form Data Provided:
- Company: ${finalCompany}
- Product Category: ${finalProduct}
- Target Country: ${primaryCountry}
- Target Countries: ${finalCountries}
${finalNotes ? `- Additional Context: ${finalNotes}` : ''}

Output: Generate up to three search queries per customer category to identify exact companies on Google.

Requirements:
- Each query must directly lead to company websites, avoiding any non-commercial results.
- Use advanced parameters (e.g., site:com, -directory, -list) for precision.
- Keep queries brief and specific; no verbosity.
- Exclude org/gov sites and contact info pages.

Please analyze the business context from the provided data and generate targeted search queries accordingly.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert in B2B lead generation and Google search optimization. Generate precise, actionable search keywords and queries for finding companies in specific industries and countries. Focus on practical, results-oriented keywords that lead directly to company websites."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    // Parse the response to extract keywords and queries
    const sections = generatedContent.split('Refined Prompt 2:');
    const generatedKeywords = sections[0]?.trim() || '';
    const generatedQueries = sections[1]?.trim() || '';

    // If we have multiple countries, generate country-specific variations
    const countrySpecificKeywords = [];
    if (countries.length > 1) {
      for (const country of countries.slice(1)) {
        const countryPrompt = `The provided keywords/queries are effective. Now, update them specifically for ${country}, ensuring they are localized and compliant with the original constraints.

Original keywords for ${primaryCountry}:
${generatedKeywords}

Generate localized keywords for ${country}:`;

        const countryCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an expert in international B2B lead generation. Adapt search keywords for different countries while maintaining their effectiveness."
            },
            {
              role: "user",
              content: countryPrompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        });

        countrySpecificKeywords.push({
          country,
          keywords: countryCompletion.choices[0]?.message?.content || ''
        });
      }
    }

    return NextResponse.json({
      success: true,
        data: {
          primaryCountry,
          keywords: generatedKeywords,
          queries: generatedQueries,
          countrySpecificKeywords,
          generatedAt: new Date().toISOString(),
          inputData: {
            product: finalProduct,
            target_country: finalCountries,
            company: finalCompany,
            notes: finalNotes,
            isConversation
          }
        }
    });

  } catch (error) {
    console.error('Error generating keywords:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate keywords',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
