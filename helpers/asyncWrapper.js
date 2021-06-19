// Мидлвар для универсальной замены try catch в контроллерах
const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

module.exports = {
  asyncWrapper,
}
