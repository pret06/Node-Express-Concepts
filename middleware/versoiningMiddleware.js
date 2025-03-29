
const urlVersioning =(version)=> (req,res,next)=>{
    if(req.path.startsWith(`/api/${version}`)){
        next()
    } else {
        res.status(404).json({
            success : false,
            message : "API Version not Supported"
        })
    }
}

const headerVersioning = (req,res,next)=>{
    if(req.get('Accept-Version') === version){
        next()
    } else {
        res.status(404).json({
            success : false,
            message : "API Version not Supported"
        })
    }
}

const contentTypeVersioning = (req,res,next)=>{
    const contentType = req.get("Content-Type")
    if(contentType && contentType.includes(`application/vnd.${version}+json`)){
        next()
    } else {
        res.status(404).json({
            success: false,
            error: "API version is not supported",
          });
    }
}

module.exports = {urlVersioning , headerVersioning , contentTypeVersioning}