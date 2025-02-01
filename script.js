// Получаем сохранённые данные из localStorage
let savedData = localStorage.getItem("editorData");
let initialData = null; 

if (savedData) {
  try {
    initialData = JSON.parse(savedData); // Преобразуем строку обратно в объект
    console.log("Найдены сохранённые данные:", initialData);
  } catch (e) {
    console.error("Ошибка при чтении сохранённых данных:", e);
  }
}

const editor = new EditorJS({
  holder: 'editorjs',
  autofocus: true,

  data: initialData, 
 
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: 'Введите заголовок...',
        levels: [1, 2, 3],
        defaultLevel: 2,
      },
    },
    table: Table,
    code: CodeTool,
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:8008/fetchUrl',
      }
    },
    list: {
      class: EditorjsList,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      },
    },
    telegramPost: TelegramPost,
    quote: Quote,
    image: {
      class: InlineImage,
      inlineToolbar: true,
      config: {
        embed: { display: true },
        unsplash: {
          appName: 'your_app_name',
          apiUrl: 'https://your-proxy-api-url.com',
          maxResults: 30,
          imageParams: { q: 85, w: 1500 }
        }
      }
    }

  }
});




// Обработчик для кнопки "Сохранить"
document.getElementById('saveButton').addEventListener('click', () => {
  editor.save().then((outputData) => {

    localStorage.setItem('editorData', JSON.stringify(outputData));
    
    console.log('Article data: ', outputData)
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
});


