// pages/api/envtest.js
module.exports = (req, res) => {
  const uri = process.env.MONGODB_URI || null;
  const db  = process.env.MONGODB_DB || null;
  const cdn = process.env.CDN_BASE_URL || null;

  let uriInfo = null;
  if (uri) {
    const m = uri.match(/^mongodb(\+srv)?:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)?/i);
    uriInfo = m ? {
      hasSrv: !!m[1],
      user: m[2],
      passLen: m[3]?.length,
      host: m[4],
      dbInUri: m[5] || null
    } : { parsed: false };
  }

  res.status(200).json({
    ok: true,
    have: {
      MONGODB_URI: !!uri,
      MONGODB_DB: !!db,
      CDN_BASE_URL: !!cdn
    },
    uriInfo,
    dbEnv: db,
    note: "如果 MONGODB_URI=false，则是生产环境变量没生效；需要到 Vercel 项目 Settings→Environment Variables(Production) 添加后 Redeploy。"
  });
};
