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
    from: 'Tentlify Rentals <partysafariohio@gmail.com>',
    to: `${cartList.email}`,
    subject: `Tentlify Rentals Quote - ${cartList.title}`,
    html: `
    <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          .my-table {
            width: 100%;
            border: 1px solid black;
          }
          .my-table th {
            text-align: center;
            background-color: #676767;
          }
          .my-table tr {
            text-align: center;
            
          }
          .my-table-2 {
            width: 100%;
            border: 1px solid black;
            margin-top: 10px;
          }
          .my-table-2 th {
            text-align: center;
            background-color: #676767;
          }
          .my-table-2 tr {
            text-align: center;
            
          }
          .product-image {
            width: 100%;
            max-width: 250px;
            height: auto;
            border-radius: 5px;
            object-fit: contain;
          }
          .flex-col-container-start {
                display: flex;
                flex-direction: column;
                align-items: center;
          }
          .flex-container-end {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .flex-container-center {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        </style>
      </head>
     
      <body>
      <div class="flex-container-center">
      <img style="width: 100px; height: 100px;" src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FTenlify_Logo_Thin_Small.png?alt=media&token=977d961e-7d08-4031-b2d1-52cfa3d2cada" alt="partySafariLogo" />
      </div>
        <h1>Your Quote</h1>
        <h3>Thank you for your interest in Tentlify Rentals! Below is your quote:</h3>
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
            <tr class="flex-container-center">
            <td class="flex-container-center" ><img class="product-image" src="${item.image}" /></td>
              <td class="flex-container-center" >${item.product}</td>
              <td class="flex-container-center" >${item.cartQuantity}</td>
              <td class="flex-container-center">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td class="flex-container-center" >$${(item.price * item.cartQuantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
           
          `).join('')}

         
          
            
          
        </table>

        <table class="my-table-2">
          <tr >
            <th>Subtotal</th>
            <th>Tax</th>
            <th>Delivery Fee</th>
            <th>Total</th>
          </tr>
          
            <tr class="bg-red-500">
              <td class="flex-container-center" >${cartList.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>${cartList.taxPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>${cartList.deliveryFee.toFixed(2)}</td>
              <td><b>${cartList.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
            </tr>
           
          
        </table>
      
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