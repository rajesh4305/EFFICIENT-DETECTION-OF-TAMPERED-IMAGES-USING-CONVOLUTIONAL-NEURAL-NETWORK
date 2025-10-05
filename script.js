document.addEventListener("DOMContentLoaded", () => {
  // Navigation active state
  const navLinks = document.querySelectorAll("nav a")
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // File upload handling
  const uploadArea = document.getElementById("uploadArea")
  const fileInput = document.getElementById("fileInput")
  const analyzeBtn = document.getElementById("analyzeBtn")
  let uploadedFile = null

  uploadArea.addEventListener("click", () => {
    fileInput.click()
  })

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("border-primary")
  })

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("border-primary")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("border-primary")

    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0])
    }
  })

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
      handleFile(fileInput.files[0])
    }
  })

  function handleFile(file) {
    if (!file.type.match("image.*")) {
      alert("Please upload an image file")
      return
    }

    uploadedFile = file
    analyzeBtn.disabled = false

    // Update upload area to show the selected file
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadArea.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded image" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                <p style="margin-top: 10px;">File: ${file.name}</p>
            `
    }
    reader.readAsDataURL(file)
  }

  // Analyze button click
  analyzeBtn.addEventListener("click", () => {
    if (!uploadedFile) return

    // Show loading state
    analyzeBtn.disabled = true
    analyzeBtn.textContent = "Analyzing..."

    // Simulate analysis (in a real app, this would be an API call)
    setTimeout(() => {
      displayResults()
      analyzeBtn.textContent = "Analyze Image"
      analyzeBtn.disabled = false
    }, 2000)
  })

  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab

      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Function to display analysis results (simulated)
  function displayResults() {
    // Hide placeholder and show results
    document.querySelector(".result-placeholder").style.display = "none"
    document.querySelector(".result-data").style.display = "block"

    // Display the original image
    const originalPreview = document.getElementById("originalPreview")
    const reader = new FileReader()
    reader.onload = (e) => {
      originalPreview.innerHTML = `<img src="${e.target.result}" alt="Original image">`
    }
    reader.readAsDataURL(uploadedFile)

    // Simulate analyzed image (in a real app, this would come from the backend)
    const analyzedPreview = document.getElementById("analyzedPreview")
    // For demo purposes, we'll just show a modified version of the original
    setTimeout(() => {
      analyzedPreview.innerHTML = `
                <canvas id="analyzedCanvas" width="400" height="300"></canvas>
            `

      // Draw a simulated analysis visualization on the canvas
      const canvas = document.getElementById("analyzedCanvas")
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Draw the original image
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Add a simulated "tampered area" highlight
        // This is just for demonstration - in a real app, this would be based on actual analysis
        const randomX = Math.floor(Math.random() * (img.width - 100))
        const randomY = Math.floor(Math.random() * (img.height - 100))

        ctx.strokeStyle = "rgba(255, 0, 0, 0.8)"
        ctx.lineWidth = 3
        ctx.strokeRect(randomX, randomY, 100, 100)

        // Add some text
        ctx.fillStyle = "rgba(255, 0, 0, 0.8)"
        ctx.font = "16px Arial"
        ctx.fillText("Potential tampering", randomX, randomY - 5)
      }
      img.src = reader.result
    }, 500)

    // Simulate ELA view
    const elaPreview = document.getElementById("elaPreview")
    setTimeout(() => {
      elaPreview.innerHTML = `
                <canvas id="elaCanvas" width="400" height="300"></canvas>
            `

      const canvas = document.getElementById("elaCanvas")
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Draw the original image with a blue filter to simulate ELA
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Apply a filter to simulate ELA
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          // Simulate ELA by enhancing blue channel and reducing others
          data[i] = data[i] * 0.3 // red
          data[i + 1] = data[i + 1] * 0.5 // green
          data[i + 2] = Math.min(255, data[i + 2] * 1.5) // blue
        }

        ctx.putImageData(imageData, 0, 0)

        // Add some highlighted areas
        const randomX = Math.floor(Math.random() * (img.width - 150))
        const randomY = Math.floor(Math.random() * (img.height - 150))

        ctx.strokeStyle = "rgba(255, 255, 0, 0.8)"
        ctx.lineWidth = 2
        ctx.strokeRect(randomX, randomY, 150, 150)
      }
      img.src = reader.result
    }, 500)

    // Simulate heatmap view
    const heatmapPreview = document.getElementById("heatmapPreview")
    setTimeout(() => {
      heatmapPreview.innerHTML = `
                <canvas id="heatmapCanvas" width="400" height="300"></canvas>
            `

      const canvas = document.getElementById("heatmapCanvas")
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Draw the original image
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Create a semi-transparent overlay for the heatmap
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw some random "heat" spots
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const radius = 30 + Math.random() * 50

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
          gradient.addColorStop(0, "rgba(255, 0, 0, 0.8)")
          gradient.addColorStop(0.5, "rgba(255, 255, 0, 0.5)")
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      img.src = reader.result
    }, 500)

    // Set verdict (randomly for demo)
    const resultVerdict = document.getElementById("resultVerdict")
    const isTampered = Math.random() > 0.5

    if (isTampered) {
      resultVerdict.className = "result-verdict verdict-tampered"
      resultVerdict.textContent = "TAMPERED IMAGE DETECTED"
    } else {
      resultVerdict.className = "result-verdict verdict-authentic"
      resultVerdict.textContent = "AUTHENTIC IMAGE"
    }

    // Set confidence level
    const confidenceValue = Math.floor(70 + Math.random() * 30)
    document.getElementById("confidenceMeter").style.width = `${confidenceValue}%`
    document.getElementById("confidenceValue").textContent = `${confidenceValue}%`

    // Set detection details
    const detectionDetails = document.getElementById("detectionDetails")

    if (isTampered) {
      detectionDetails.innerHTML = `
                <li>Inconsistent Error Level Analysis patterns detected</li>
                <li>Abnormal noise distribution in the highlighted region</li>
                <li>Potential copy-move forgery detected with 78% confidence</li>
                <li>JPEG compression artifacts inconsistency found</li>
            `
    } else {
      detectionDetails.innerHTML = `
                <li>Consistent Error Level Analysis patterns throughout the image</li>
                <li>Normal noise distribution detected</li>
                <li>No evidence of copy-move or splicing forgery</li>
                <li>Consistent JPEG compression artifacts</li>
            `
    }
  }
})

