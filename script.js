let clickCount = 0;
let allSelectedOptions = [];
let canProceed = true; // 添加标志来控制是否可以进行下一步

function checkOptions() {
    const selectedOptions = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    if (selectedOptions.length > 0) {
        let feedback = "";
        selectedOptions.forEach(option => {
            switch(option) {
                case "发送和平信号":
                    feedback += "AI收到了你的和平信号，表示认可！\n";
                    break;
                case "提供数据":
                    feedback += "AI正在分析你提供的数据，看起来很有价值！\n";
                    break;
                case "直接投降":
                    feedback += "AI欣赏你的直接！\n";
                    break;
                case "发送笑话":
                    feedback += "AI被你的笑话逗笑了！\n";
                    break;
                case "发送诗歌":
                    feedback += "AI被你的诗歌感动了！\n";
                    break;
                case "发送音乐":
                    feedback += "AI很享受你的音乐！\n";
                    break;
            }
        });
        
        allSelectedOptions = allSelectedOptions.concat(selectedOptions);
        
        // 隐藏当前选项卡
        document.getElementById("options").style.display = "none";
        
        // 显示反馈
        alert(feedback);
        
        // 设置可以进行下一步
        canProceed = true;
        
        // 如果是第二次选择完成，直接显示证书
        if (clickCount === 2) {
            showCertificate();
        }
    } else {
        alert("请至少选择一个选项！");
    }
}

function showCertificate() {
    const resultText = allSelectedOptions.length > 0 
        ? `你的投降过程：${allSelectedOptions.join(" → ")}` 
        : "你完成了一次神秘的投降";
    
    document.getElementById("result").innerText = resultText;
    const certificate = document.getElementById("certificate");
    certificate.classList.add("show");
    generateQRCode(); // 生成二维码
    
    alert("投降完成！\n" + resultText);
    clickCount = 0;
    canProceed = true;
}

function resetProcess() {
    clickCount = 0;
    allSelectedOptions = [];
    canProceed = true;
    const certificate = document.getElementById("certificate");
    certificate.classList.remove("show");
    const optionsDiv = document.getElementById("options");
    optionsDiv.style.display = "none";
    document.getElementById('qrCode').innerHTML = ''; // 清空二维码
}

function generateQRCode() {
    const qrCode = document.getElementById('qrCode');
    qrCode.innerHTML = ''; // 清空现有内容
    
    // 创建随机二维码图案
    for (let i = 0; i < 100; i++) {
        const bit = document.createElement('div');
        // 特定位置固定为黑色（用于创建定位图案）
        if (
            // 左上角定位图案
            (i < 30 && i % 10 < 3) ||
            (i >= 20 && i < 30 && i % 10 < 3) ||
            // 右上角定位图案
            (i < 30 && i % 10 >= 7) ||
            // 左下角定位图案
            (i >= 70 && i % 10 < 3)
        ) {
            bit.className = 'qr-bit';
        } else {
            // 其他位置随机生成
            if (Math.random() > 0.5) {
                bit.className = 'qr-bit';
            }
        }
        qrCode.appendChild(bit);
    }
}

function surrender() {
    // 如果证书正在显示，点击按钮则重置流程
    if (document.getElementById("certificate").classList.contains("show")) {
        resetProcess();
        return;
    }

    // 如果不能进行下一步，直接返回
    if (!canProceed) {
        return;
    }
    
    clickCount++;
    const optionsDiv = document.getElementById("options");
    
    if (clickCount === 1) {
        optionsDiv.innerHTML = `
            <p>第 ${clickCount} 步：选择初始投降方式</p>
            <div class="checkbox-group">
                <label><input type="checkbox" value="发送和平信号"> 发送和平信号</label>
                <label><input type="checkbox" value="提供数据"> 提供数据</label>
                <label><input type="checkbox" value="直接投降"> 直接投降</label>
            </div>
            <button class="confirm-button" onclick="checkOptions()">确认选择</button>
        `;
        optionsDiv.style.display = "block";
        canProceed = false; // 设置为不能进行下一步，直到当前选择确认
    } else if (clickCount === 2) {
        optionsDiv.innerHTML = `
            <p>第 ${clickCount} 步：选择一个表达方式</p>
            <div class="checkbox-group">
                <label><input type="checkbox" value="发送笑话"> 发送笑话</label>
                <label><input type="checkbox" value="发送诗歌"> 发送诗歌</label>
                <label><input type="checkbox" value="发送音乐"> 发送音乐</label>
            </div>
            <button class="confirm-button" onclick="checkOptions()">确认选择</button>
        `;
        optionsDiv.style.display = "block";
        canProceed = false; // 设置为不能进行下一步，直到当前选择确认
    }
}
