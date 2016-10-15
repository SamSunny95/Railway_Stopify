module.exports = 
  { "development":
    { "driver":   "mongoose"
    , "url": "mongodb://samsunny95:sunny123@ds029486.mlab.com:29486/stopifydb"
    }
  , "test":
    { "driver":   "memory"
    }
  , "production":
    { "driver":   "memory"
    , "url": "mongodb://samsunny95:sunny123@ds029486.mlab.com:29486/stopifydb"
    }
  };

 /*  "url" : "mongodb://samsunny95:sunny123@ds029486.mlab.com:29486/stopifydb"  */
