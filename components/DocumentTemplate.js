import moment from "moment";

const DocumentTemplate = document => {
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      table,
      th,
      td {
        border: 1px solid;
        border-collapse: collapse;
        text-align: left;
      }

      table {
        width: 100%;
      }

      .text-center {
        text-align: center;
      }

      th,
      td {
        padding: 8px;
      }
    </style>
  </head>
  <body>
    <h1>Transaction History</h1>
    <table>
      <tr>
        <th class="text-center">No.</th>
        <th>Transaction Id</th>
        <th>Sender</th>
        <th>Recipient</th>
        <th>Date</th>
        <th>Time</th>
        <th class="text-center">Amount(RM)</th>
      </tr>
      ${document.map(
        ({ sender, recipient, amount, created_at, transaction_id }, i) => `
      <tr>
        <td class="text-center">${i + 1}</td>
        <td>${transaction_id}</td>
        <td>${sender}</td>
        <td>${recipient}</td>
        <td>${moment(created_at).format("D-MM-YY")}</td>
        <td>${moment(created_at).format("h.mma")}</td>
        <td class="text-center">${amount}</td>
      </tr>
      `
      )}
    </table>
  </body>
</html>
`;
};

export default DocumentTemplate;
