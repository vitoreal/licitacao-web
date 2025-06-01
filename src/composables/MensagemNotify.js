import { Notify } from 'quasar';

export default function MensagemNotify() {

  // Tipos de mensagem exibidas no sistema
  const mensagemPositive = async (mensagem) => {

    Notify.create({
      type: 'positive',
      message: mensagem,
      position: 'top',
      group: false,
    })

  }

  const mensagemNegative = async (mensagem) => {

    Notify.create({
      type: 'negative',
      message: mensagem,
      position: 'top',
      group: false,
    })

  }

  const mensagemWarning = async (mensagem) => {

    Notify.create({
      type: 'warning',
      message: mensagem,
      position: 'top',
      group: false,
    })

  }



  return {
    mensagemPositive,
    mensagemNegative,
    mensagemWarning,
  }
}
