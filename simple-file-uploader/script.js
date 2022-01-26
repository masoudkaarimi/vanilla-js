const form = document.querySelector('form'),
    fileInput = document.querySelector('.file-input'),
    progressArea = document.querySelector('.progress-area'),
    uploadedArea = document.querySelector('.uploaded-area');

// Form click event
form.addEventListener('click', () => {
    fileInput.click();
});

fileInput.onchange = ({target}) => {
    // Getting file [0] this means if user has selected multiple files then get first one only
    let file = target.files[0];
    if (file) {
        // Getting file name
        let fileName = file.name;
        // If file name length is greater than 12 then split it and add...
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + '... .' + splitName[1];
        }
        // Calling uploadFile with passing file name as an argument
        uploadFile(fileName);
    }
};

// File upload function
function uploadFile(name) {
    // Creating new xhr object (AJAX)
    let xhr = new XMLHttpRequest();
    // Sending post request to the specified URL
    xhr.open('POST', 'php/upload.php');
    // File uploading progress event
    xhr.upload.addEventListener('progress', ({loaded, total}) => {
        // Getting percentage of loaded file size
        let fileLoaded = Math.floor((loaded / total) * 100);
        // Getting total file size in KB from bytes
        let fileTotal = Math.floor(total / 1000);
        let fileSize;
        // If file size is less than 1024 then add only KB else convert this KB into MB
        fileTotal < 1024
            ? (fileSize = fileTotal + ' KB')
            : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + ' MB');

        let progressHTML = `
            <li class="row">
              <i class="fas fa-file-alt"></i>
              <div class="content">
                <div class="details">
                  <span class="name">${name} • Uploading</span>
                  <span class="percent">${fileLoaded}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress" style="width: ${fileLoaded}%"></div>
                </div>
              </div>
            </li>
        `;

        // Uncomment this line if you don't want to show upload history
        // UploadedArea.innerHTML = "";
        uploadedArea.classList.add('onprogress');
        progressArea.innerHTML = progressHTML;

        if (loaded === total) {
            progressArea.innerHTML = '';
            let uploadedHTML = `
                <li class="row">
                    <div class="content upload">
                      <i class="fas fa-file-alt"></i>
                      <div class="details">
                        <span class="name">${name} • Uploaded</span>
                        <span class="size">${fileSize}</span>
                      </div>
                    </div>
                    <i class="fas fa-check"></i>
                </li>
            `;

            uploadedArea.classList.remove('onprogress');
            // Uncomment this line if you don't want to show upload history
            // uploadedArea.innerHTML = uploadedHTML;

            // Remove this line if you don't want to show upload history
            uploadedArea.insertAdjacentHTML('afterbegin', uploadedHTML);
        }
    });

    // FormData is an object to easily send form data
    let data = new FormData(form);
    // Sending form data
    xhr.send(data);
}
