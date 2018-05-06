"use strict"

const compress = new Compress()
const preview = document.getElementById("preview")
const output = document.getElementById("output")

const upload = document.getElementById("upload")

upload.addEventListener(
  "change",
  (evt) => {
    const files = [...evt.target.files]
    compress
      .compress(files, {
        size: 0.25, // the max size in MB, defaults to 2MB
        quality: 0.75, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      })
      .then((images) => {
        console.log(images)
        const img = images[0]
        // returns an array of compressed images
        preview.src = `${img.prefix}${img.data}`
        console.log(img)

        const {
          endSizeInMb,
          initialSizeInMb,
          iterations,
          sizeReducedInPercent,
          elapsedTimeInSeconds,
          alt,
          quality
        } = img

        output.innerHTML = `<strong>Start Size:</strong> ${initialSizeInMb} MB <br/>
        <strong>End Size:</strong> ${endSizeInMb} MB <br/>
        <strong>Compression Cycles:</strong> ${iterations} <br/>
        <strong>Size Reduced:</strong> ${sizeReducedInPercent} % <br/>
        <strong>File Name:</strong> ${alt} <br/>
        <strong>Final quality:</strong> ${quality}`

        output.innerHTML = `
          <table>
            <tr><th>Start Size:</th><td>${initialSizeInMb} MB</td></tr>
            <tr><th>End Size:</th><td>${endSizeInMb} MB</td></tr>
            <tr><th>Compression Cycles:</th><td>${iterations}</td></tr>
            <tr><th>Size Reduced:</th><td>${sizeReducedInPercent} %</td></tr>
            <tr><th>File Name:</th><td>${alt}</td></tr>
            <tr><th>Final quality:</th><td>${quality}</td></tr>
          </table>
        `
      })
  },
  false
)
