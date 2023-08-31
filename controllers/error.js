exports.get404 = (req, res, next) => {
  res.status(404).render('error', {
    pageTitle: 'Page Not Found',
    error: "Page Not Found",
    path: '/404'
  });
};


exports.getErrorPage = (req, res, next) => {
  res.status(500).render('error', {
    pageTitle: 'Page Not Found',
    error: "Some thing went wrong",
    path: '/404'
  })
}