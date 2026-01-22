document.getElementById('downloadBtn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    const status = document.getElementById('statusMessage');

    if (!videoUrl) {
        status.innerText = "يرجى إدخال رابط أولاً!";
        status.style.color = "red";
        return;
    }

    status.innerText = "جاري المعالجة... يرجى الانتظار";
    status.style.color = "#007bff";

    try {
        // جلب البيانات من الرابط
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        
        // إنشاء رابط وهمي للتنزيل
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        // تسمية الملف
        a.download = 'video_downloaded_' + Date.now() + '.mp4';
        
        document.body.appendChild(a);
        a.click();
        
        // تنظيف الروابط المؤقتة
        window.URL.revokeObjectURL(url);
        status.innerText = "تم التحميل بنجاح!";
        status.style.color = "green";
    } catch (error) {
        console.error(error);
        status.innerText = "خطأ: لا يمكن تحميل هذا الرابط مباشرة بسبب سياسات الأمان أو الرابط غير مباشر.";
        status.style.color = "red";
    }
});