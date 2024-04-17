import nodemailer from 'nodemailer';

export const sendMail = async(req, res) => {

    const cartList = req.body.cartList;

    console.log("CART LIST", cartList)

    const cartListString = cartList.map(item => 
        `Item: ${item.product}<br />\nQuantity: ${item.cartQuantity}\n <br /> Price: $${item.price}\n\n`
      ).join('');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'partysafariohio@gmail.com',
      pass: 'anyr mgnk grow xjnt'
    }
  });

  let mailOptions = {
    from: 'partysafariohio@gmail.com',
    to: 'john.gerard.kelley@gmail.com',
    subject: 'Party Safari Quote',

    // html: `
    // <h1>Your Quote</h1>
    // <table style="width:100%; border: 1px solid black; borderRadius: 5px">
    //   <tr>
    //   <th>Image</th>
    //     <th>Item</th>
    //     <th>Quantity</th>
    //     <th>Price</th>
    //   </tr>
    //   ${cartList.map(item => `
    //     <tr>
    //       <td><img style="width:50px; height:50px; borderRadius:5px;" src={${item.image}} /></td>
    //       <td>${item.product}</td>
    //       <td>${item.cartQuantity}</td>
    //       <td>$${item.price}</td>
    //     </tr>
    //   `).join('')}
    // </table>
    // `
    html: `
    <html>
      <head>
      <style>
          .container {
            width: 95%;
            border: 2px solid black;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
          }
          .card {
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 2px 2px 2px 2px rgba(20,20,20,0.4);
            margin-top: 5px;
            margin-bottom: 5px;
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
          .product-image {
            width: 75px;
            height: 50px;
            object-fit: contain;
            border-radius: 5px;
          }
        </style>
        
      </head>
      <body>

        
        <div class="container">
        <h1 class="">Your Quote</h1>
          
          ${cartList.map(item => `
            <div class="card">
                <div class="flex-col-container-start">
                    <img class="product-image" src="${item.image}" />
                    <h3>${item.product}</h3>
                </div>

                <div class="flex-container-end">
                    <p>Qty: ${item.cartQuantity}</p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
              
              
            </div>
          `).join('')}
        </div>
        <p>Thank you for your interest!</p>
      </body>
    </html>
  `,
  };

  let info = await transporter.sendMail(mailOptions);

  res.send('Email sent: ' + info.response);

}


{/* <html>
      <head>
        <style>
          .my-table {
            width: 100%;
            border: 1px solid black;
          }
          .my-table th {
            text-align: left;
          }
          .product-image {
            width: 50px;
            height: 50px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Your Quote</h1>
        <table class="my-table">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
          ${cartList.map(item => `
            <tr>
              <td>${item.product}</td>
              <td>${item.cartQuantity}</td>
              <td>$${item.price.toFixed(2)}</td>
              <td><img class="product-image" src="${item.image}" /></td>
            </tr>
          `).join('')}
        </table>
        <p>Thank you for your interest!</p>
      </body>
    </html> */}

    