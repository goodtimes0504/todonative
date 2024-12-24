(() => {
  // 状态变量
  let toDoListArray = [];
  // UI变量
  const form = document.querySelector(".form");
  const input = document.querySelector(".form_input");
  const ul = document.querySelector(".toDoList");
  //事件监听 点击提交按钮
  form.addEventListener("submit", (e) => {
    //阻止action和刷新 和按钮失去焦点
    e.preventDefault();
    // 使用定时器延迟失焦 不然由于preventDefault 按钮不会失去焦点
    setTimeout(() => {
      document.activeElement.blur();
    }, 100);
    //创建一个唯一ID
    const itemId = String(Date.now());
    //获取和分配输入的值
    const toDoItem = input.value;
    // 将id和值传递到函数中 一个操作dom一个操作数组
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    //清除输入框
    input.value = "";
  });
  //事件监听 点击li标签删除
  ul.addEventListener("click", (e) => {
    //判断点击的是不是li标签
    if (e.target.tagName.toLowerCase() !== "li") {
      return;
    }
    const id = e.target.getAttribute("data-id");
    if (!id) {
      return;
    }
    //删除dom
    removeItemFromDOM(id);
    //删除数组
    removeItemFromArray(id);
  });
  /** 完善上面用到的函数 */
  function addItemToDOM(itemId, toDoItem) {
    //创建一个列表项
    const li = document.createElement("li");
    li.setAttribute("data-id", itemId); //设置id
    li.textContent = toDoItem; //设置内容 不处理标签
    // li.innerText = toDoItem //设置内容 会处理标签
    //将li添加到ul DOM中
    ul.appendChild(li);
  }
  function addItemToArray(itemId, toDoItem) {
    console.log(toDoItem);
    //将id和值添加到数组中
    toDoListArray.push({ itemId, toDoItem });
    console.log(toDoListArray);
  }
  function removeItemFromDOM(id) {
    //根据id找到对应的li [data-id="id"]这种格式
    const li = document.querySelector('[data-id="' + id + '"]');
    //删除li
    ul.removeChild(li);
  }
  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter((item) => item.itemId !== id);
    console.log(toDoListArray);
  }
})();
