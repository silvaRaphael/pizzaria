/**
* Template Name: NiceAdmin
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

/**
* Máscara monetária.
* @param {string} selector
* @param {number} maxLength
* @param {string} separator
* @returns {void}
*/
function CurrencyMask(selector = '', maxLength = 5, separator = ',') {
  if (!document.querySelector(selector)) return;
  document.querySelector(selector).maxLength = maxLength + 1;
  document.querySelector(selector).oninput = (event) => {
    let value = [...event.target.value.replace(/\D/g, "")];
    if (event.target.value.trim().length > 2) {
      value.splice(value.length - 2, 0, separator);
    }
    event.target.value = value.join('');
  }
}

/**
 * Notificação.
 * @param {string} text
 * @param {string} style
 * @param {() => void} onClick
 * @returns {void}
 */
function Notification(text = '', style = 'success', onClick = () => { }) {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "var(--vz-" + style + ")",
    },
    onClick,
  }).showToast();
}

/**
* Alerta excluir
* @param {() => Promise} onConfirmed
* @param {() => void} [onDone]
* @returns {void}
*/
function CustomAlert(onConfirmed = () => { }, onDone = () => { }) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success w-xs mx-1',
      cancelButton: 'btn btn-danger w-xs mx-1'
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    html: '<div class="mt-3"><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon><div class="mt-4 pt-2 fs-15 mx-5"><h4>Deseja realmente excluir?</h4><p class="text-muted mx-4 mb-0">Esta ação não poderá ser desfeita.</p></div></div>',
    reverseButtons: true,
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Não, cancelar!',
    focusConfirm: true,
    focusCancel: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await onConfirmed();
        swalWithBootstrapButtons.fire({
          text: 'Excluído com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
          focusConfirm: true,
        }).then((result) => onDone(result));
      } catch (error) {
        console.error(error);
      }
    }
  });
}

/**
* Alerta confirmar.
* @param {() => Promise} onConfirmed
* @param {() => void} [onDone]
* @returns {void}
*/
function CustomConfirmationAlert({ title = 'Tem certeza dessa escolha?', buttonLabel = 'Sim, confirmar!', successMessage = 'Confirmado com sucesso!' }, onConfirmed = () => { }, onDone = () => { }) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success w-xs mx-1',
      cancelButton: 'btn btn-danger w-xs mx-1'
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    html: '<div class="mt-3"><lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f06548,secondary:#f7b84b" style="width:100px;height:100px"></lord-icon><div class="mt-4 pt-2 fs-15 mx-5"><h4>' + title + '</h4></div></div>',
    reverseButtons: true,
    showCancelButton: true,
    confirmButtonText: buttonLabel,
    cancelButtonText: 'Não, cancelar!',
    focusConfirm: true,
    focusCancel: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await onConfirmed();
        swalWithBootstrapButtons.fire({
          text: successMessage,
          icon: 'success',
          confirmButtonText: 'Ok',
          focusConfirm: true,
        }).then((result) => onDone(result));
      } catch (error) {
        console.error(error);
      }
    }
  });
}

/**
* generare key
* @param {number} length
* @returns {string}
*/
function generateKey(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz0123456789";
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += chars[Math.floor(Math.random() * 60)];
  }
  return randomString;
}

// localização

/**
* buscar CEP
* @param {HTMLElement} button
* @param {string} tab
* @returns {void}
*/
function buscarCEP(button, tab) {

  const cep = document.querySelector(`${tab} [name="cep"]`).value.trim().replace(/\D/g, "");

  if (cep.length != 8) return;

  const carregar_dados_plano_request = new ApiRequest(`https://viacep.com.br/ws/${cep}/json`, 'GET', tab);

  carregar_dados_plano_request.setButton(button);

  carregar_dados_plano_request.onSuccess((data) => {

    listarCidades(data.ibge.substring(0, 2), tab, data.ibge);

    carregar_dados_plano_request.setCampos({
      endereco: data.logradouro,
      bairro: data.bairro,
      id_uf: data.ibge.substring(0, 2),
    });

    document.querySelector(`${tab} [name="numero"]`).focus();
  });

  carregar_dados_plano_request.enviar();
}

/**
* listar cidades
* @param {string} id_uf
* @param {string} tab
* @param {string} id_cidade
* @returns {void}
*/
function listarCidades(id_uf, tab, id_cidade) {

  document.querySelector(`${tab} [name="id_cidade"]`).innerHTML = '<option selected value="">Selecione uma opção</option>';

  if (!id_uf) return;

  const listar_cidades_request = new ApiRequest('/cidades/carregar-lista', 'POST', tab);

  listar_cidades_request.setDados({ id_uf });

  listar_cidades_request.onSuccess((data) => {
    for (let i = 0; i <= data.total - 1; i++) {
      const opt = document.createElement('option');
      opt.value = data.cidades[i].id;
      opt.innerHTML = data.cidades[i].cidade;
      document.querySelector(`${tab} [name="id_cidade"]`).appendChild(opt);
    }
    if (id_cidade) document.querySelector(`${tab} [name="id_cidade"]`).value = id_cidade;
  });

  listar_cidades_request.enviar();
}

// api

/**
* http request
* @async
* @param {string} url
* @param {string} method
* @param {{}} data
* @returns {Promise}
*/
async function sendRequest(url = '/', method = 'GET', data = {}) {
  try {
    let body = new URLSearchParams();
    if (data) Object.entries(data).forEach((item) => {
      body.append(item[0], item[1]);
    });

    let options = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      if (body) options.body = body;
    }

    const result = await fetch(url, options);

    return result.json();
  } catch (error) {
    return {
      status: false,
      msg: error.message,
    };
  }
}

/**
* classe API request
* @class
*/
class ApiRequest {
  url = '';
  method = '';
  dados = {};
  selector = '';
  button = null;
  buttonText = '';
  success = function () { };

  /**
   * dados request
   * @param {string?} url
   * @param {string?} method
   * @param {string?} selector
   */
  constructor(url, method, selector) {
    this.url = url;
    this.method = method;
    this.selector = selector;
  }

  /**
   * @param {string} url
   */
  setUrl(url) {
    this.url = url;
  }

  /**
   * @param {Function} success
   */
  onSuccess(success) {
    this.success = success;
  }

  /**
   * @param {HTMLElement} button
   */
  setButton(button) {
    this.button = button;
    this.buttonText = this.button.textContent;
  }

  /**
   * @param {{ campo: valor }} dados
   */
  setDados(dados) {
    this.dados = dados;
  }

  limparCampos() {
    [...Object.values(document.querySelectorAll(`${this.selector} input`)), ...Object.values(document.querySelectorAll(`${this.selector} select`))].forEach((item) => {
      item.style.borderColor = '';
      item.value = '';
    });
  }

  /**
   * @param {{ campo: valor }} campos
   */
  setCampos(campos) {
    Object.entries(campos).forEach((item) => {
      document.querySelector(`${this.selector} [name="${item[0]}"]`).value = item[1];
    });
  }

  /**
  * @return {boolean}
  */
  validarCampos() {
    const erros = [];
    Object.values(document.querySelectorAll(`${this.selector} [required]`)).forEach((item) => {
      item.style.borderColor = (!item.value || item.dataset.hasError) ? 'red' : '';
      if ((!item.value || item.dataset.hasError)) erros.push(1);
    });
    return erros.length == 0;
  }

  buttonLoading() {
    if (this.button) {
      this.button.innerHTML = '<span class="spinner-border text-warning" role="status" style="width: 1rem; height: 1rem;"></span>';
      this.button.style.pointerEvents = 'none';
    }
  }

  buttonDone() {
    if (this.button) {
      this.button.innerHTML = this.buttonText;
      this.button.style.pointerEvents = '';
    }
  }

  /**
  * @async
  * @returns {Promise}
  * @throws {Error}
  */
  async enviar() {
    try {
      this.buttonLoading();

      const response = await sendRequest(this.url, this.method, this.dados);

      if (response.status == false) {
        if (response.msg) Notification(response.msg, 'danger');
        this.buttonDone();
        return response;
      }

      this.success(response);
      this.buttonDone();

      return response;
    } catch (error) {
      console.error(error);
      Notification('Sinto muito! Ocorreu um erro. Tente novamente.', 'danger');
    }

    this.buttonDone();
  }
}

/**
 * Alerta excluir
 * @param {() => Promise} onConfirmed
 * @param {() => void} [onDone]
 * @returns {void}
 */
function CustomAlert(onConfirmed = () => { }, onDone = () => { }) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success w-xs mx-1',
      cancelButton: 'btn btn-danger w-xs mx-1'
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    html: '<div class="mt-3"><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon><div class="mt-4 pt-2 fs-15 mx-5"><h4>Deseja realmente remover?</h4><p class="text-muted mx-4 mb-0">Esta ação não poderá ser desfeita.</p></div></div>',
    reverseButtons: true,
    showCancelButton: true,
    confirmButtonText: 'Sim, remover!',
    cancelButtonText: 'Não, cancelar!',
    focusConfirm: true,
    focusCancel: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await onConfirmed();
        swalWithBootstrapButtons.fire({
          text: 'Removido com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
          focusConfirm: true,
        }).then((result) => onDone(result));
      } catch (error) {
        console.error(error);
      }
    }
  });
}

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function (e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
            color: []
          },
          {
            background: []
          }
          ],
          [{
            script: "super"
          },
          {
            script: "sub"
          }
          ],
          [{
            list: "ordered"
          },
          {
            list: "bullet"
          },
          {
            indent: "-1"
          },
          {
            indent: "+1"
          }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
      title: 'My page 1',
      value: 'https://www.tiny.cloud'
    },
    {
      title: 'My page 2',
      value: 'http://www.moxiecode.com'
    }
    ],
    image_list: [{
      title: 'My page 1',
      value: 'https://www.tiny.cloud'
    },
    {
      title: 'My page 2',
      value: 'http://www.moxiecode.com'
    }
    ],
    image_class_list: [{
      title: 'None',
      value: ''
    },
    {
      title: 'Some class',
      value: 'class-name'
    }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
      title: 'New Table',
      description: 'creates a new table',
      content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
    },
    {
      title: 'Starting my story',
      description: 'A cure for writers block',
      content: 'Once upon a time...'
    },
    {
      title: 'New list with dates',
      description: 'New List with dates',
      content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
    }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function () {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();