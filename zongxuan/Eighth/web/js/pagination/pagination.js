function pageInit({
    pages = 10,
    currentPage = 1,
    element = '.page-container',
    callback
}) {

    intercept();

    const myPageEl = document.querySelector(element);

    // 构造结构
    let htmlStrArr = [];
    for (let i = 0; i < pages; i++) {
        htmlStrArr.push(`<li class="page-container-cell">${i + 1}</li>`);
    };
    if (pages > 7) {
        htmlStrArr.splice(5, htmlStrArr.length - 6, "<li class='page-container-omit'>...</li>");
    };
    htmlStr = htmlStrArr.join("");
    let pageHtmlStr = `<div class="page-container-prev"><</div>
        <ul class="page-container-group">${htmlStr}</ul>
        <div class="page-container-next">></div>`;

    // 注入结构
    myPageEl.innerHTML = pageHtmlStr;

    // 标记默认页
    clickPageFun(currentPage);

    // 上下页切换事件注册
    let btns = document.querySelectorAll(`${element} div`);
    btns.forEach(el => {
        el.onclick = switchPage;
    });

    // 点击事件注册
    myPageEl.onclick = function (e) {
        // console.log(e)
        let classNameArr = e.target.className.split(" ");
        if (classNameArr.indexOf("page-container-cell") !== -1) {
            clickPageFun(Number(e.target.innerText));
        };
    }

    // 上下页按钮触发
    function switchPage(e) {
        // 获取当前页
        let page = document.querySelector(`${element} .page-container-checked`).innerText - 0;

        let classNameArr = e.target.className.split(" ");
        if (classNameArr.indexOf("page-container-prev") !== -1) {
            clickPageFun(page - 1); // 上一页
        } else if (classNameArr.indexOf("page-container-next") !== -1) {
            clickPageFun(page + 1); // 下一页
        };
    };


    // 分页切换处理
    function clickPageFun(page) {
        page = Number(page);
        // 满足条件改变结构
        if (pages > 7) {
            let newEl = '';
            if (page <= 4) {
                newEl = `
                <li class="page-container-cell">1</li>
                <li class="page-container-cell">2</li>
                <li class="page-container-cell">3</li>
                <li class="page-container-cell">4</li>
                <li class="page-container-cell">5</li>
                <li class="page-container-omit">•••</li>
                <li class="page-container-cell">${pages}</li>`;
            } else if (page >= 5 && page < pages - 3) {
                newEl = `
                <li class="page-container-cell">1</li>
                <li class="page-container-omit">•••</li>
                <li class="page-container-cell">${page - 1}</li>
                <li class="page-container-cell">${page}</li>
                <li class="page-container-cell">${page + 1}</li>
                <li class="page-container-omit">•••</li>
                <li class="page-container-cell">${pages}</li>`;
            } else if (page >= pages - 3) {
                newEl = `
                <li class="page-container-cell">1</li>
                <li class="page-container-omit">•••</li>
                <li class="page-container-cell">${pages - 4}</li>
                <li class="page-container-cell">${pages - 3}</li>
                <li class="page-container-cell">${pages - 2}</li>
                <li class="page-container-cell">${pages - 1}</li>
                <li class="page-container-cell">${pages}</li>`;
            };
            document.querySelector(`${element} .page-container-group`).innerHTML = newEl;
        };

        // 标注选中项
        let pageCellELs = document.querySelectorAll(`${element} .page-container-cell`);
        pageCellELs.forEach(el => {
            if (el.innerText == page) {
                el.classList.add('page-container-checked');
            } else {
                el.classList.remove('page-container-checked');
            };
        });

        forbidden(page);

        // 回调响应
        callback && callback(page);
    };

    // 上下页按钮启禁
    function forbidden(page) {
        let prveEl = document.querySelector(`${element} .page-container-prev`);
        let nextEl = document.querySelector(`${element} .page-container-next`);
        if (page === 1) {
            prveEl.classList.add('page-container-forbid');
        } else {
            prveEl.classList.remove('page-container-forbid');
        };

        if (page === pages) {
            nextEl.classList.add('page-container-forbid');
        } else {
            nextEl.classList.remove('page-container-forbid');
        };
    };

    // 参数检验
    function intercept() {
        if (!pages || pages === 0 || (Math.floor(pages) != pages)) {
            throw "page-container中pages必须是整数且不为0";
            pages = Math.floor(pages);
        };

        if (!currentPage || currentPage === 0 || (Math.floor(currentPage) !== currentPage)) {
            throw "page-container中currentPage必须是整数且不为0";
            currentPage = Math.floor(currentPage);

        };

        if (document.querySelectorAll(element).length === 0) {
            throw element + "元素不存在";
        };

        if (currentPage > pages) {
            throw "当前页不存在";
        }
    };
}