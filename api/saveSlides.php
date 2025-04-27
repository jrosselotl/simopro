function saveSlide() {
  const fileInput = document.getElementById('imageUpload');
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    // Subir imagen primero
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('api/uploadImage.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(imagePath => {
      saveSlideData(imagePath);
    })
    .catch(error => {
      console.error('Error subiendo imagen:', error);
      alert('Error subiendo la imagen.');
    });
  } else {
    // Guardar con URL escrita en input
    const manualUrl = document.getElementById('image').value;
    saveSlideData(manualUrl);
  }
}

function saveSlideData(imagePath) {
  const slide = {
    title: document.getElementById('title').value,
    subtitle: document.getElementById('subtitle').value,
    image: imagePath,
    position: document.getElementById('position').value,
    overlayColor: document.getElementById('overlayColor').value,
    overlayOpacity: parseFloat(document.getElementById('overlayOpacity').value),
    textColor: document.getElementById('textColor').value,
    button: {
      text: document.getElementById('buttonText').value,
      link: document.getElementById('buttonLink').value
    },
    animation: document.getElementById('animation').value
  };

  const id = document.getElementById('slideId').value;
  if (id !== '') {
    slides[id] = slide;
  } else {
    slides.push(slide);
  }

  localStorage.setItem('slides', JSON.stringify(slides));
  clearForm();
  renderSlides();
}
