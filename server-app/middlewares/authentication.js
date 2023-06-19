module.exports = function (req, res, next) {
    console.log('Chegou no middware de bloqueio:', req.query.token);
    if (req.query.token === 'meutokensecreto') {
      console.log('Token autorizado');
      return next();
    }
    console.log('Deu ruim no middleware de bloqueio: Token inválido');
  
    res.status(401).send('Não autorizado');
  };