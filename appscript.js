function receberDados(req) {
  const pedido = req.parameter.pedido;
  const documento = SpreadsheetApp.getActiveSpreadsheet();
  const tabelaNome = documento.getSheetByName('PEDIDOS');
  const valores = sheet.getDataRange().getValues();

  const saida = [];
  for(let i = 1; i < valores.length; i++) {
    const linha = {};
    linha['Pedido'] = valores[i][0];
    linha['Data'] = valores[i][1];
    linha['Transportadora'] = valores[i][2];
    saida.push(linha);
  }

  if(pedido != null) {
    const retornoSaida = saida.filter(e => e.Pedido.includes(pedido));
    return ContentService.createTextOutput(JSON.stringify({retornoSaida})).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({saida})).setMimeType(ContentService.MimeType.JSON);
}

// https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgW7r1BhB_iEz23sJPewEeyDTPxR5x41WJcPs4NNGJyrUadikHyvRQPMnQfbAZLetBD-gomjG5NH3gRiAimsLFzw3l9zQcFGKR65qK_mP0Sm7RoMJ2a3RYW07EzrVKyXkAZDf05ALCjU6MZ9OzEHsLMpH2WpTNAyrWrvmcxFSg3kV29oDd2M-WVXxn53rhsvgBL2kK1rUdUpFETzYkzNXy6BafTINeBYyFER8W7ncVXdmki5OWZv8qYT-HaLoREkOCqwYfIzrOzESI7RxwQC8h4jsw9Dw&lib=My3a4HMFVOcrTZl6rilGlbdsDAbAZVzxj