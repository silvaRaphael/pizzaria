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
      background: "var(--bs-" + style + ")",
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
async function sendRequest(url = '/', method = 'GET', body = {}) {
  try {
    let options = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) options.body = JSON.stringify(body);

    return await fetch(url, options);
  } catch (error) {
    return {
      ok: false,
      error: error.message,
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
  body = null;
  selector = '';
  button = null;
  buttonText = '';
  success = function () { };
  error = function () { };

  /**
   * request data
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
   * @param {Function} error
   */
  onError(error) {
    this.error = error;
  }

  /**
   * @param {HTMLElement} button
   */
  setButton(button) {
    this.button = button;
    this.buttonText = this.button.textContent;
  }

  /**
   * @param {{ field: value }} body
   */
  setBody(body) {
    this.body = body;
  }

  clearFields() {
    [...Object.values(document.querySelectorAll(`${this.selector} input`)), ...Object.values(document.querySelectorAll(`${this.selector} select`))].forEach((item) => {
      item.style.borderColor = '';
      item.value = '';
    });
  }

  /**
   * @param {{ field: value }} fields
   */
  setFields(fields) {
    Object.entries(fields).forEach((item) => {
      document.querySelector(`${this.selector} [name="${item[0]}"]`).value = item[1];
    });
  }

  /**
 * @param {string} fieldName
 */
  getField(fieldName) {
    return document.querySelector(`${this.selector} [name="${fieldName}"]`);
  }

  /**
  * @return {boolean}
  */
  validate() {
    const errors = [];
    Object.values(document.querySelectorAll(`${this.selector} [required]`)).forEach((item) => {
      item.style.borderColor = (!item.value || item.dataset.hasError) ? 'red' : '';
      if ((!item.value || item.dataset.hasError)) errors.push(1);
    });
    return errors.length == 0;
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
  async send() {
    try {
      this.buttonLoading();

      const response = await sendRequest(this.url, this.method, this.body);

      if (!response.ok) {
        const error = await response.json();

        this.error(error);
        this.buttonDone();

        return error;
      }

      const success = response.status === 204 ? response : await response.json();

      this.success(success);
      this.buttonDone();

      return success;
    } catch (error) {
      console.error(error);
      Notification('Sinto muito! Ocorreu um erro. Tente novamente.', 'danger');
    }

    this.buttonDone();
  }
}