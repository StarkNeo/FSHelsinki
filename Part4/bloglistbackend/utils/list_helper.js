const dummy = (blogs) => {
  return 1
}

const sumLikes=(blogs)=>{
  return blogs.reduce((sum,item)=>sum+item.likes,0)
}

module.exports = {
  dummy,
  sumLikes
}

