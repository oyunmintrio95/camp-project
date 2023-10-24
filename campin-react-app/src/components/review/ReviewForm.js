import './imageUpload.css';

export default function ReviewForm(){

    function byId(id) {
        return document.getElementById(id);
    }
    
    const imgPreview = byId("imgPreview");
    console.log("imgPreview" + imgPreview);
    const preview = byId("preview");
    console.log("preview" + preview);
    let currentFile;
    
    // byId('theFile').addEventListener("change", function () {
    
    //     if (this.files.length === 0) {
    //         return;
    //     }
    
    //     let reader = new FileReader();
    //     reader.onload = function () {
    //         imgPreview.src = reader.result;
    //         preview.style.display = "block";
    //     };
    //     currentFile = this.files[0];
    //     reader.readAsDataURL(currentFile);
    
    // }, false);

    function handleImgChange(event){
        if (event.target.files.length === 0) {
            return;
        }
    
        let reader = new FileReader();
        reader.onload = function () {
            if(imgPreview){
                imgPreview.src = reader.result;
            }
            if(preview){
                preview.style.display = "block";
            }
            
        };
        currentFile = event.target.files[0];
        reader.readAsDataURL(currentFile);
    
    }
    
    // This sends the file to the Java backend (ImageUploadController.upload).
    function handleUpload(){
        const formData = new FormData();
        formData.append("file", currentFile, currentFile.name);
    
        const init = {
            method: "POST",
            body: formData
        };
    
        fetch("http://localhost:8080/api/review/upload", init)
            .then(() => console.log("success!"))
            .catch(console.error);
    };
    // byId("btnUpload").addEventListener("click", function () {
    
    //     const formData = new FormData();
    //     formData.append("file", currentFile, currentFile.name);
    
    //     const init = {
    //         method: "POST",
    //         body: formData
    //     };
    
    //     fetch("/upload", init)
    //         .then(() => console.log("success!"))
    //         .catch(console.error);
    // });

    return (
        <>
            <h1>Upload It!</h1>

                <div className="form-group">
                    <input type="file" id="theFile" accept="image/*" className="form-control" onChange={handleImgChange}/>
                </div>

                <div class="form-group">
                    <button className="btn btn-primary" id="btnUpload" onClick={handleUpload}>Upload</button>
                </div>

                <div id="preview" className="form-group">
                    <img id="imgPreview"/>
                </div>
        </>
    );
}