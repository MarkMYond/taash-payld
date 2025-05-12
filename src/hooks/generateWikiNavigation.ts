import { Payload } from 'payload';
import { Category, WikiPage } from '../payload-types';
import fs from 'fs';
import path from 'path';


// Interface for navigation items
interface NavItem {
  id: string;
  title: string;
  slug?: string;
  icon?: string;
  isCategory?: boolean;
  children?: NavItem[];
  hasChildren?: boolean;
}

// Helper function to build Payload query parameters
const buildPayloadQuery = (
  query: Record<string, any>
): Record<string, any> => {
  return query;
};

/**
 * Generate wiki navigation JSON file
 * @param payload Payload CMS instance
 * @returns Promise<void>
 */
export const generateWikiNavigation = async (payload: Payload): Promise<void> => {
  console.log('Generating wiki navigation JSON...');
  
  try {
    // Define output path for JSON file - place in frontend/public directory
    const publicPath = path.resolve(process.cwd(), '../frontend/public');
    const outputFile = path.join(publicPath, 'wiki-navigation.json');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    // Fetch all categories
    const categoriesQuery = buildPayloadQuery({
      sort: 'sort',
      limit: 50,
    });
    
    const categoriesResult = await payload.find({
      collection: 'categories',
      ...categoriesQuery,
    });
    
    const categories = categoriesResult.docs || [];
    console.log(`Found ${categories.length} categories`);

    // Build the navigation structure
    const navItems: NavItem[] = await Promise.all(
      categories.map(async (category: any) => {
        // Find pages for this category
        const pagesQuery = buildPayloadQuery({
          where: {
            category: { equals: category.id },
            parent: { exists: false },
            status: { equals: 'published' },
            isSectionHomepage: { not_equals: true },
          },
          sort: 'sort',
          limit: 100,
        });
        
        const pagesResult = await payload.find({
          collection: 'wiki-pages',
          ...pagesQuery,
        });
        
        const pages = pagesResult.docs || [];
        console.log(`Found ${pages.length} pages for category ${category.name}`);

        // Process pages
        const pageNavItems: NavItem[] = await Promise.all(
          pages.map(async (page: any) => {
            // Check if page has children
            const childrenQuery = buildPayloadQuery({
              where: {
                parent: { equals: page.id },
                status: { equals: 'published' },
                isSectionHomepage: { not_equals: true },
              },
              limit: 1,
            });
            
            const childrenResult = await payload.find({
              collection: 'wiki-pages',
              ...childrenQuery,
            });
            
            const hasChildren = childrenResult.totalDocs > 0;

            return {
              id: page.id,
              title: page.title,
              slug: page.slug,
              icon: page.icon,
              hasChildren,
              isCategory: false,
            };
          })
        );

        // Return category with its pages
        return {
          id: category.id,
          title: category.name,
          isCategory: true,
          children: pageNavItems,
          hasChildren: pageNavItems.length > 0,
        };
      })
    );

    // Filter out empty categories
    const filteredNavItems = navItems.filter(
      item => item.isCategory && item.children && item.children.length > 0
    );

    // Write to file
    fs.writeFileSync(outputFile, JSON.stringify(filteredNavItems, null, 2));
    console.log(`Wiki navigation generated and saved to ${outputFile}`);

  } catch (error) {
    console.error('Error generating wiki navigation:', error);
    throw error;
  }
};
