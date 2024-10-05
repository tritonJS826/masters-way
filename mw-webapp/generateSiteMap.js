import { createWriteStream } from "fs";
import { resolve } from "path";
import { SitemapStream, streamToPromise } from "sitemap";

/**
 * Generate site map file for robots
 */
async function generateSitemap() {
  // Specify your main domain
  const baseUrl = "https://www.mastersway.netlify.app";

  // Create a stream for writing to the file
  const sitemap = new SitemapStream({ hostname: baseUrl });

  // Specify the path for saving sitemap.xml
  const filePath = resolve("./public/sitemap.xml");
  const writeStream = createWriteStream(filePath);

  // Write to the file through the stream
  sitemap.pipe(writeStream);

  // Define the routes you want to include in the sitemap
  const routes = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/pricing", changefreq: "weekly", priority: 0.8 },
    { url: "/ways/", changefreq: "weekly", priority: 0.8 },
    { url: "/users/", changefreq: "weekly", priority: 0.8 },
    { url: "/aboutProject", changefreq: "weekly", priority: 0.8 },
    { url: "/privacyPolicy", changefreq: "weekly", priority: 0.8 },
    { url: "/land/mentors", changefreq: "weekly", priority: 0.8 },
    { url: "/land/studentsWithMentors", changefreq: "weekly", priority: 0.8 },
    { url: "/land/studentsWithAI", changefreq: "weekly", priority: 0.8 },
    { url: "/land/business", changefreq: "weekly", priority: 0.8 },
  ];

  routes.forEach((route) => {
    sitemap.write(route);
  });

  // Finish writing
  sitemap.end();

  // Wait for the stream to finish
  await streamToPromise(sitemap);

  console.log("Sitemap created and saved at:", filePath);
}

// Execute the function
generateSitemap();
