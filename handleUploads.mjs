const handleUpload = (req, res) => {

    console.log(req.fields, req.files)
    
    res.status(200)

}

export {handleUpload}