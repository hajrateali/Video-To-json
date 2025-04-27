function uploadVideo() {
  const input = document.getElementById('videoInput');
  const gallery = document.getElementById('gallery');
  const files = input.files;
  
  if (files.length === 0) {
    alert("Please select videos.");
    return;
  }
  
  const videos = [];
  let loaded = 0;
  
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const videoUrl = e.target.result;
      videos.push({ url: videoUrl });
      
      const video = document.createElement('video');
      video.src = videoUrl;
      video.controls = true;
      video.style.width = "300px";
      video.style.margin = "10px";
      gallery.appendChild(video);
      
      loaded++;
      if (loaded === files.length) {
        // Sab videos load ho gaye, ab JSON file banao
        const json = JSON.stringify({ videos: videos }, null, 2);
        downloadJSON(json, "videos.json");
      }
    };
    
    reader.readAsDataURL(files[i]);
  }
}

function downloadJSON(data, filename) {
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(url);
}