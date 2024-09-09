// This is your test publishable API key.
const stripe = Stripe("pk_test_51Px5eUAuccQUcRvfQIP8e81ZYXmNeCwgibSIt18FaG1txEHqDtzZy6UBLcBBGFV1IbcvlfbHYfKDsqhL1apTKEQU005W7OqAYj");

localStorage.setItem('carrito', JSON.stringify([
  {
      "referencia": "2873bcb2-b224-473b-b313-66e4f37193cf",
      "nombre": "Camiseta Xl",
      "precio": 62000,
      "imagen": "https://picsum.photos/300/300?random=1",
      "cantidad": 1
  },
  {
      "referencia": "a52a673c-4437-4740-a907-7177387108d7",
      "nombre": "Pantalon2",
      "precio": 50000,
      "imagen": "https://picsum.photos/300/300?random=3",
      "cantidad": 1
  }
]))

// The items the customer wants to buy
const items = JSON.parse(localStorage.getItem('carrito'));

let elements;

initialize();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret, dpmCheckerLink } = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");

  // [DEV] For demo purposes only
  setDpmCheckerLink(dpmCheckerLink);
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: borrarCarrito(),
    },
  });
  // localStorage.removeItem('productos');
  // localStorage.clear();
  console.log('hola');
  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

function setDpmCheckerLink(url) {
  document.querySelector("#dpm-integration-checker").href = url;
}

document.getElementById('submit1').addEventListener('click', function() {
  // Mostrar el spinner y ocultar el texto del botón
  document.getElementById('spinner').classList.remove('hidden');
  document.getElementById('button-text').classList.add('hidden');

  // Simular un retraso para el pago (2 segundos)
  setTimeout(function() {
      // Aquí puedes agregar el código para vaciar el carrito
      localStorage.removeItem('carrito'); // Suponiendo que 'cart' es la clave en localStorage

      document.getElementById('spinner').classList.add('hidden');
      document.getElementById('button-text').classList.remove('hidden');
      alert('Pago realizado exitosamente');
      
      // Redirigir al índice
      window.location.href = '/';
  }, 2000); // 2000 ms = 2 segundos
});

