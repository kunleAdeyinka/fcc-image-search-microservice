module.exports = function(app, queryModel, client) {
  // query the db for the shortUrl and forward to the original url
  app.route('/api/imagesearch/:query*').get((req, res, next) => {
    let queryVal = req.params.query;
    let offset = req.query.offset;
    let result = [];

    let queryData = new queryModel({
      search_term: queryVal,
      created_at: new Date()
    });

    queryData.save((err) => {
        if(err){
          result = {"error": "An error occurred!"};
        }
    });

    client.search(queryVal, {page: offset}).then(images => {
        if(images.length <= 0){
          result.push({
            url: null,
            snippet: null,
            thumbnail: null,
            context: null
          });
        }else{
          for(var i=0; i<10; i++){
            result.push({
              url: images[i].url,
              snippet: images[i].description,
              thumbnail: images[i].thumbnail.url,
              context: images[i].parentPage
            });
          }

        }
        res.json(result);
    });
  });

  app.route('/api/latest/imagesearch/').get((req, res, next) => {
    queryModel.find({}, (err, data) => {
      res.json(data);
    });
  });
};
