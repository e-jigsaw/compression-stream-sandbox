document.getElementById("file")?.addEventListener("change", (ev: Event) => {
  const file = (ev.currentTarget as HTMLInputElement).files?.item(0);
  if (file) {
    const blob = new Blob([file], { type: file?.type });
    const url = URL.createObjectURL(blob);
    const img = new Image(1200, 666);
    img.onload = async () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, 1200, 666);
        const blob1 = new Blob([data.data]);
        const stream = blob1.stream();
        const compStream = stream.pipeThrough(new CompressionStream("gzip"));
        const res = new Response(compStream);
        const blob2 = await res.blob();
        const url1 = URL.createObjectURL(blob2);
        const a = document.getElementById("link") as HTMLAnchorElement;
        a.href = url1;
        a.download = "comp.gzip";
        a.click();
      }
    };
    img.src = url;
  }
});
