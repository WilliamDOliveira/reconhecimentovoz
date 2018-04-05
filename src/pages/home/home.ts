import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // doc oficial
  // https://github.com/pbakondy/cordova-plugin-speechrecognition

  // Fiz esse modelo usando este tutorial
  // https://coursetro.com/posts/code/83/Using-Ionic-Cordova's-Speech-Recognition-Plugin-(Tutorial)

  // Aquim uma opção interessante, mais completa com uma lib gratuita
  //https://stackoverflow.com/questions/38571063/voice-recognition-speech-to-text-stt-cordova-plugin

  //outra opção
  //http://devgirl.org/2016/01/08/speaking-with-cordova/

  bgcolor: string = '#333333';


  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {
  }

  ngOnInit() {
    /**
     * Verifica se o aplicativo foi autorizado acessar funções
     */
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }
      });
  }

  /**
   * Inicia a aplicação, app começa ouvir
   */
  start() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.bgcolor = matches[0];
        },
        (onerror) => console.log('error:', onerror)
      )
  }

  /**
   * Termina a aplicação
   */
  stop() {
    this.speechRecognition.stopListening()
    .then( success=>{
      alert('Gravação concluida')
    })
    .catch( error=>{
      console.log('Stop gravação, error: ', error);
    })
  }



}//=== [ //EndClass ] ===//
