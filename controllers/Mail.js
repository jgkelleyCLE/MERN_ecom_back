import nodemailer from 'nodemailer';

export const sendMail = async(req, res) => {

    const cartList = req.body.cartList;

    console.log("SUBTOTAL", cartList.subtotal)
    console.log("DELIVERY FEE", cartList.deliveryFee)
    console.log("TAX PRICE", cartList.taxPrice)
    console.log("TOTAL", cartList.total)

    console.log("EMAIL", cartList.email)
    console.log("DATE", cartList.selected)


    console.log("CART LIST", cartList)


    let date = new Date(cartList.selected); // assuming cartList.selected is a date

    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    let year = date.getFullYear();

    let formattedDate = month + '/' + day + '/' + year;


  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'partysafariohio@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: 'Party Safari <partysafariohio@gmail.com>',
    to: `${cartList.email}`,
    subject: `Party Safari Quote - ${cartList.title}`,
    html: `
    <html>
      <head>
        <style>
          .my-table {
            width: 100%;
            border: 1px solid black;
          }
          .my-table th {
            text-align: left;
            background-color: #ff8c1a;
          }
          .product-image {
            width: 50px;
            height: 50px;
            border-radius: 5px;
          }
          .flex-col-container-start {
                display: flex;
                flex-direction: column;
                align-items: start;
          }
          .flex-container-end {
                display: flex;
                flex-direction: column;
                align-items: end;
            }
            .flex-container-center {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        </style>
      </head>
      <body>
      <div class="flex-container-center">
      <img style="width: 100px; height: 100px;" src="https://partysafariohio.com/wp-content/uploads/2018/06/Party-Safari-LogoColor.png" alt="partySafariLogo" />
      </div>
        <h1>Your Quote</h1>
        <h3>Thank you for your interest in Party Safari! Below is your quote:</h3>
        <h4>Event Date: ${formattedDate}</h4>
        <h4>Email: ${cartList.email}</h4>
        <table class="my-table">
          <tr>
            <th>Image</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Item Price</th>
          </tr>
          ${cartList.cart.map(item => `
            <tr>
            <td><img class="product-image" src="${item.image}" /></td>
              <td>${item.product}</td>
              <td>${item.cartQuantity}</td>
              <td>$${item.price.toFixed(2)}</td>
              <td>$${(item.price * item.cartQuantity).toFixed(2)}</td>
            </tr>
           
          `).join('')}

         
          
            
          
        </table>
            <div class="flex-container-end">
          
          <p>Subtotal: ${cartList.subtotal.toFixed(2)}</p>
          <p>Tax: ${cartList.taxPrice.toFixed(2)}</p>
          <p>Delivery Fee: ${cartList.deliveryFee.toFixed(2)}</p>
          <h3 style="font: bold">Total: ${cartList.total.toFixed(2)}</h3>
            </div>
        
        
      </body>
    </html>
  `,
  };

  let info = await transporter.sendMail(mailOptions);

  res.send('Email sent: ' + info.response);

}




    

    // <html>
    //   <head>
    //   <style>
    //       .container {
    //         width: 95%;
    //         border: 2px solid black;
    //         border-radius: 5px;
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         padding: 10px;
    //       }
    //       .card {
    //         width: 90%;
    //         display: flex;
    //         align-items: center;
    //         justify-content: space-between;
    //         padding: 10px;
    //         border-radius: 5px;
    //         box-shadow: 2px 2px 2px 2px rgba(20,20,20,0.4);
    //         margin-top: 5px;
    //         margin-bottom: 5px;
    //       }
    //       .flex-col-container-start {
    //         display: flex;
    //         flex-direction: column;
    //         align-items: start;
    //       }
    //       .flex-container-end {
    //         display: flex;
    //         flex-direction: column;
    //         align-items: end;
    //       }
    //       .product-image {
    //         width: 75px;
    //         height: 50px;
    //         object-fit: contain;
    //         border-radius: 5px;
    //       }
    //     </style>
        
    //   </head>
    //   <body>

        
    //     <div class="container">
    //     <h1 class="">Your Quote</h1>
          
    //       ${cartList.cart.map(item => `
    //         <div class="card">
    //             <div class="flex-col-container-start">
    //                 <img class="product-image" src="${item.image}" />
    //                 <h3>${item.product}</h3>
    //             </div>

    //             <div class="flex-container-end">
    //                 <p>Qty: ${item.cartQuantity}</p>
    //                 <p>$${item.price.toFixed(2)}</p>
    //             </div>
              
              
    //         </div>
    //       `).join('')}

    //       <div class="flex-container-end">
          
    //       <p>Subtotal: ${cartList.subtotal.toFixed(2)}</p>
    //       <p>Tax: ${cartList.taxPrice.toFixed(2)}</p>
    //     <p>Delivery Fee: ${cartList.deliveryFee.toFixed(2)}</p>
    //     <h3 style="font: bold">Total: ${cartList.total.toFixed(2)}</h3>
    //     </div>

    //     </div>
    //     <p>Thank you for your interest!</p>
    //   </body>
    // </html>