export async function getServerSideProps({ previewData }, context) {
    try {
      // Prismic client
      const clientPrismic = createClient({ previewData });
      const pagePrismic = await clientPrismic.getSingle("homepage");
  
      // MongoDB
      const clientMongoDb = await clientPromise;
      const mongoDb = clientMongoDb.db("main");
  
      const pageSize = 20;
      // How to get to context.query? previewData.query?
      let { page } = context.query;
      page = page || 1;
  
      // console.log("Page: " + page);
  
      const jobs = await mongoDb
        .collection("jobs")
        .find({})
        .sort({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();
  
      const totalJobs = await mongoDb.collection("jobs").count();
  
      const totalPages = Math.ceil(totalJobs / pageSize);
  
      // console.log("total pages in jobs: " + totalPages);
  
      return {
        props: {
          metaTitle: page.data.meta_title,
          metaDescription: page.data.meta_description,
          ogImage: page.data.og_image.url,
          pagePrismic: pagePrismic,
  
          totalPages: totalPages,
          page: page,
          jobs: JSON.parse(JSON.stringify(jobs)),
        },
      };
    } catch (e) {
      console.log(e);
    }
  }