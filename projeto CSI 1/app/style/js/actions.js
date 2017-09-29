// Próximo ID para adicionar um novo serviço
var idNext = 1;
// ID do serviço que está sendo editado
var _activeId = 0;

/**
 * Caléndario para dia de agendamento
 */
$('.datepicker').pickadate({
  monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje',
  clear: 'Limpar',
  close: 'Pronto',
  labelMonthNext: 'Próximo mês',
  labelMonthPrev: 'Mês anterior',
  labelMonthSelect: 'Selecione um mês',
  labelYearSelect: 'Selecione um ano',
  selectMonths: true,
  selectYears: 15
});

/**
 * Verificar se o usuário está no sistema
 */
function Login() {
  if ($("#email").val() != null && $("#email").val() != '' && $("#senha").val() != null && $("#senha").val() != '') {
    if ($("#entra").text() == "Entra") {
      direcionarUsuario();
    }
  }
}

/**
 * Direcionar o usuário
 */
function direcionarUsuario() {
  if ($("#email").val() == "adm" && $("#senha").val() == "csi") {
    location.href = "pages/templateAdm.html"
  } else if ($("#email").val() == "vivianny@hotmail.com" && $("#senha").val() == "123") {
    location.href = "pages/templateUsuario.html"
  } else {
    alert("Usuário não cadastrado!");
  }
}

/**
 * Limpa campo do formulario de serviço
 */
function formClear() {
  $("#servico").val("");
  $("#dataAgendamento").val("");
}

/**
 * Estrutura da tabela
 * @param {*} id 
 * @returns linhas da tabela
 */
function bookBuildTableRow(id) {
  var row = "<tr>" +
    "<td>" + $("#servico").val() + "</td>" +
    "<td>" + $("#dataAgendamento").val() + "</td>" +
    "<td>" +
    "<button type='button' " +
    "onclick='bookDisplay(this);' " +
    "class='btn btn-default'" +
    "data-id='" + id + "'>" +
    "<span class='glyphicon glyphicon-edit'></span>" +
    "</button>" +
    "</td>" +
    "<td>" +
    "<button type='button' " +
    "onclick='bookDelete(this);' " +
    "class='btn btn-default'" +
    "data-id='" + id + "'>" +
    "<span class='glyphicon glyphicon-remove'></span>" +
    "</button>" +
    "</td>" +
    "</tr>"

  return row;
}

/**
 *  Adicionar serviço
 */
function addDataToTable() {
  // Primeiro verifica se a tag <tbody> existe. Adiciona um caso não exista
  if ($("#bookTable tbody").length == 0) {
    $("#bookTable").append("<tbody></tbody>");
  }

  // Adiciona serviço na Tabela
  $("#bookTable tbody").append(bookBuildTableRow(idNext));

  idNext += 1;
}

/**
 * Eliminar linha de dados
 * 
 * @param {*} button_delete 
 */
function bookDelete(button_delete) {
  $(button_delete).parents("tr").remove();
}

/**
 * Editar dados (serviço, data de agendamento) do usuário
 *  
 * @param {*} button_edit 
 */
function bookDisplay(button_edit) {
  var row = $(button_edit).parents("tr");
  var cols = row.children("td");

  _activeId = $($(cols[3]).children("button")[0]).data("id");

  $("#servico").val($(cols[0]).text());
  $("#dataAgendamento").val($(cols[1]).text());

  // Mudar o texto do Botão
  $("#updateButton").text("Actualizar");
}

/**
 * Atualizar dados na tabela
 * @param {*} id 
 */
function updateTableData(id) {

  // Encontra o serviço na tabela
  var row = $("#bookTable button[data-id='" + id + "']").parents("tr")[0];

  // Adiciona a linha modifica na tabela
  $(row).after(bookBuildTableRow());

  // Remover a linha antiga
  $(row).remove();

  // Limpar o formulário
  formClear();

  // Mudar o texto do Botão
  $("#updateButton").text("Adicionar Serviço");
}

/**
 * Botão de atualizar dados
 */
function updateDatas() {
  if ($("#servico").val() != null && $("#servico").val() != '') {
    if ($("#updateButton").text() == "Actualizar") {
      updateTableData(_activeId);
    } else {
      addDataToTable();
    }

    // Limpa o formulário
    formClear();

    // Mantém o focu no campo Título
    $("#servico").focus();
  }
}