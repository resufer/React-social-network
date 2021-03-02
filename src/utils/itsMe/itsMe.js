let itsMe = () => {
  return isNaN(parseInt(window.location.pathname.replace(/\//gi, '').split('').reverse().join('')))
}

export default itsMe;