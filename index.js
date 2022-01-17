const puppeteer = require('puppeteer');
const fs = require('fs');
const { PendingXHR } = require('pending-xhr-puppeteer');
var loguins = require('./data.json');
var request = require('request');
var remove = require('remove');
process.env.NTBA_FIX_319 = 1;
process.env["NTBA_FIX_350"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const { Console } = require('console');
const token = '1166886043:AAEeJlJl7r8y1i_ivKqk5HYFC3mFu61OhgA';
const bot = new TelegramBot(token, {polling: false});
const chatId = '821592272';
const channel = '-1001481756129';
const group = '-1001423587135';
global.usuario = 'user';
global.passw = 'passw';
global.pasaporte = 'passp'
global.resultado = 'result'
let agend = 0
////////////////////////////////////////////////////////////     CONSTANTES DEL SITIO WEB   /////////////////////////////////////////////////////////////////////
const USERNAME_xpath = '//*[@id="emil"]';
const USERNAME_SELECTOR = '#emil';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = 'body > div:nth-child(3) > div > div > div > div.panel-body > div > span > form > div:nth-child(4) > div.col-xs-12.col-sm-6 > button.btnc.btn-primary';
const prog = '/html/body/div[2]/div/div[2]/div/div[3]/button';
const prog_selector = 'body > div:nth-child(3) > div > div.container > div > div:nth-child(4) > button';
const next = '/html/body/div[2]/div/div[2]/div/div[2]/div/div[2]/div[4]/div/div/button[2]';
const next_selector = 'body > div:nth-child(3) > div > div.container > div > div:nth-child(2) > div > div.panel-body > div:nth-child(6) > div > div > button.btnc.btn-primary'
const cartel = '//*[@id="step2"]/h6';
const visa = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/span/form/div[1]/div/span/div/div/div/div[1]/input';
const load = 'body > div:nth-child(3) > div > div:nth-child(1) > div';
const visa_selector = 'body > div:nth-child(3) > div > div.container > div > div:nth-child(2) > div.panel.panel-default > div.panel-body > span > form > div:nth-child(1) > div > span > div > div > div > div.vs__selected-options > input';
const tipo = '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/span/form/div[1]/div[2]/div[1]/span/div/div/div/div[1]/input';
const tipo_selector = 'body > div:nth-child(3) > div > div.container > div > div:nth-child(2) > div.panel.panel-default > div.panel-body > span > form > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span > div > div';
const passport_selector = '#no_passport';
const agendar_selector = 'body > div:nth-child(3) > div > div.container > div > div:nth-child(2) > div.panel.panel-default > div.panel-body > span > form > div:nth-child(3) > div > div > button';
const msg_selector = 'body > div:nth-child(3) > div > div.container > div > div:nth-child(2) > div:nth-child(1) > div > p';
const logout_selector = 'body > div:nth-child(3) > div > div:nth-child(1) > nav > div > p:nth-child(1) > a';
const sesion_selector = 'body > div:nth-child(3) > div > div > div > div.modal-mask > div.modal-wrapper > div > div.modal-footer > button.btnc.btn-primary';



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async function startBrowser() {
    const browser = await puppeteer.launch({headless: true, args: ["--no-sandbox"]});
    const page = await browser.newPage();
    return {browser, page};
  }
  async function closeBrowser(browser) {
    browser.close();
  }




async function playTest(url) {
  
  //CREANDO CARPETA PARA SCREENSHOTS
    const path = `${usuario}`;
    if (fs.existsSync(path)){
      fs.rmSync(path, { recursive: true });
    } 
    fs.mkdirSync(path);
    const {browser, page} = await startBrowser();
    const pendingXHR = new PendingXHR(page);
    //ARRANCANDO EL BROWSER
    try{
    //console.info("Opening browser para " + usuario);
    page.setViewport({width: 1366, height: 768});
    //dirigiendonos al url mexitel
    await page.goto(url);
    //console.info("Loading web");
    ////////////////////////////        LOGIN STEP       //////////////////////////////////////////
    
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(usuario);            //USUARIO
    await page.click(PASSWORD_SELECTOR); 
    await page.keyboard.type(passw);             //CONTRASEñA
    console.info("LOGIN " + usuario);
      //await page.screenshot({path: `${path}/00_LOGUIN.png`});   
      //HACIENDO CLIC EN INGRESAR
    await page.click(CTA_SELECTOR);
            
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    //TRABAJANDO DENTRO DE LA WEB
    
    await page.waitForXPath(prog, { timeout: 12000 });                                  //ESPERO BOTON DE PROGRAMAR
    try {
      console.info("DENTRO " + usuario);
      await page.screenshot({path: `${path}/01_DENTRO.png`});
      await page.click(prog_selector);                                                  // DOY CLIC EN PROGRAMAR
      // await page.waitForResponse(response => response.url().includes('/api/v1/event') && response.status() === 200)
      await pendingXHR.waitForAllXhrFinished();                                      // ESPERO TODAS LAS PETICIONES TERMINEN
      await page.click(next_selector);                                                 //DOY CLIC EN SIGUIENTE
      //await page.waitForResponse(response => response.url().includes('/api/v1/procedures') && response.status() === 200)
      await pendingXHR.waitForAllXhrFinished();                                        //ESPERO LAS PETICIONES TERMINEN
      console.info("DATOS " + usuario);
      //await page.screenshot({path: `${path}/02_DATOS.png`});
      await page.click(visa_selector);                            // DOY CLIC EN EL CAJON PARA SELECCIONAR VISAS SIN PERMISO DEL INM
      await page.keyboard.type('Visa sin');                       //ESCRIBO visa sin
      await page.keyboard.press('Enter');                         //APRIETO TECLA ENTER
      // page.waitForNetworkIdle() 
      await pendingXHR.waitForAllXhrFinished();                      //ESPERO LAS PETICIONES TERMINEN
      //await page.waitForResponse(response => response.url().includes('/api/v1/procedures/2/types') && response.status() === 200)
      await page.click(passport_selector);                               //DANDO CLIC EN EL CAJON PARA ESCRIBIR PASAPORTE
      //await page.keyboard.type(pasaporte);                              //ESCRIBIENDO PASAPORTEEEEEE
      await page.click(tipo_selector);                                  //DANDO CLIC EN CAJON PARA SELECCIONAR TIPO DE VISA
      await page.keyboard.type('visa turismo')                          //ESCRIBIENDO VISA TURISMO
      await page.keyboard.press('Enter');                               //APRIETO TECLA ENTER
      await page.click(passport_selector);                              //DANDO CLIC EN EL CAJON PARA ESCRIBIR PASAPORTE
      await page.keyboard.type(pasaporte);                              //ESCRIBIENDO PASAPORTEEEEEE

     let cita;

     // console.info(user.agendada)
      page.on('response', async response => {
        if (//response.request().method()==='POST' ||
          response.url()==='https://mexitelcuba.sre.gob.mx/api/v1/turn')
          //console.log(response.ok())
          cita = response.status()
          
        }),

     await page.click(agendar_selector);
     console.info("LAST STEP " + usuario);
     agend = 0
     //console.info(cita)
     if (cita >=200 || cita<300){
      //AQUI VA EL CODIGO SI AGENDAMOS CITAS
      agend = 1                                                     //ESCRIBIR 1 A AGENDADA EN EL JSON DE LAS CUENTAS
        /////////////////////////////////////// ENVIO DE SMS
     var url = 'https://qvatel.com/api/sms/send';
     var headers = {
         'Content-Type': 'application/x-www-form-urlencoded'
     };
     var form = {api_token: 'ac9d9e2ca5500a9a2c52b7b9', destino: '+5353771970', mensaje: usuario + ' Cita Agendada!!' };
     request.post({headers: headers, url: url, form: form, method: 'POST'}, function (err, res, body) {
          //var bodyValues = JSON.parse(body);
          //res.send(bodyValues);
     });
    ////////////////////////////////////////////////////////////////////ENVIO DE MSG TELEGRAM
      bot.sendMessage(chatId,usuario + ' Agendado')
      bot.sendMessage(channel, 'MEXICO ESTA AGENDANDO CITAS!!!').then(function(msg) {
      bot.pinChatMessage(channel,msg.message_id);
      });
      bot.sendMessage(group, 'A CORRER QUE ABRIO MEXICOOOOO').then(function(msg) {
      bot.pinChatMessage(group,msg.message_id);
    });

    }
    else{
      //AQUI VA EL CODIGO SI NO AGENDAMOS CITAS
      //console.info('No agendamos, iniciando acciones')
      bot.sendMessage(chatId,usuario + ' Intento ok, no hay citas aun')
    }
    await pendingXHR.waitForAllXhrFinished();

    ////////////////////////////////////////////////     FINAL ACCIONES   /////////////////////////////////////////////////////////
  }
    finally { 
      await page.screenshot({path: `${path}/04_NO CITA.png`})
      //console.info('Screen tomado')
      await page.click(logout_selector);
      await pendingXHR.waitForAllXhrFinished();
      console.info("Saliendo " + usuario);
    }
    
      }  //FIN DEL TRY DE TRABAJO DENTRO DE LA WEB
  catch {
      console.info("Error logueando usuario " + usuario);
    }
  finally {
         console.info('CERRANDO BROWSER')
         await browser.close();
        }
    }



totalusers = loguins['Usuarios'];

  const fetching = async () => {
    //for (const user of totalusers) 
    for(var i=0;i<loguins.Usuarios.length;i++)
    {
    usuario = loguins.Usuarios[i].user;                     // declaramos usuario
    passw = loguins.Usuarios[i].passw;                      // declaramos password  
    pasaporte = loguins.Usuarios[i].passp;                  // declaramos pasaporte  
    citaagendada = loguins.Usuarios[i].agendada;
    //console.info(citaagendada)
    if (citaagendada == 0){
      const data = await playTest("https://mexitelcuba.sre.gob.mx/auth");
      console.info('ESCRIBIENDO JSON')
      if (agend == 1){
      loguins.Usuarios[i].agendada = agend;
      fs.writeFileSync('./data.json', JSON.stringify(loguins, null, 2));}}
    else{
      console.info(usuario + ' :Usuario con cita agendada')
    }
      //console.log(data)
    }
  }  

fetching()
