import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boost',
  templateUrl: './boost.component.html',
  styleUrls: ['./boost.component.scss']
})
export class BoostComponent implements OnInit {
  paymentHandler:any = null;

  name:any;
  desciption='';

  amount: any ;

  premiumBoost = '10 Boost' ;
  premiumBoostPrice = '20';
  sliverBoost = '5 Boost' ;
  sliverBoostPrice = '10';
  bronzeBoost = '1 Boost' ;
  bronzeBoostPrice = '5';
  constructor() { }

  ngOnInit(): void {
    this.invokeStripe();
  }

  makePayment(amount, catagory) {
    const paymentHandler = (window as any).StripeCheckout.configure({
      key: 'pk_test_51IxFIzD2HnE7dte2WY0lsHbxJYwi3PsA3IDkVW4qwl3XioDljKuOtqZHUNYW9pIQBgSTN0UMK4oKoHdlI9gRNJu500Ln0IJNyk',
      locale: 'auto',
      // tslint:disable-next-line: object-literal-shorthand
      token: function (stripeToken: any) {
        this.amount = amount;
        this.description= catagory;
        alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: this.name,
      description:this.desciption,
      amount: this.amount * this.amount
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51IxFIzD2HnE7dte2WY0lsHbxJYwi3PsA3IDkVW4qwl3XioDljKuOtqZHUNYW9pIQBgSTN0UMK4oKoHdlI9gRNJu500Ln0IJNyk',
          locale: 'auto',
          token (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }



}
