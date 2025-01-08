// eslint-disable-next-line no-unused-vars
import React from "react";
import CommonTopNab from "../../Shared/CommonTopNav/CommonTopNab";
import { useLoaderData } from "react-router";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function SingleCustomerProductDetails() {
  const data = useLoaderData();
  const customer = data.data;

  const calculateTax = (price, taxRate) => ((price * taxRate) / 100).toFixed(2); // Use product's tax rate
  const calculateProductTotal = (price, quantity, tax) =>
    (price * quantity + parseFloat(tax)).toFixed(2);
  
  // Update grand total to consider dynamic tax rates
  const grandTotal = customer.purchasedProducts?.reduce(
    (total, product) =>
      total +
      parseFloat(
        calculateProductTotal(
          product.p_price,
          product.quantity,
          calculateTax(product.p_price, product.tax) // Use product.tax as percentage
        )
      ),
    0
  );

  const handlePrint = () => {
    const printContent = document.getElementById("print-area").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            .table th { background-color: #f4f4f4; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { margin: 0; }
            .footer { margin-top: 20px; text-align: right; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  // Generate PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add custom header
    doc.setFontSize(18);
    doc.text("Positive IT Solution", doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });

    // Add customer details
    doc.setFontSize(12);
    doc.text(`Customer Name: ${customer.customerName}`, 10, 20);
    doc.text(`Customer Email: ${customer.customerEmail}`, 10, 30);
    doc.text(`Customer Phone: ${customer.customerPhone}`, 10, 40);
    doc.text(`Customer Address: ${customer.customerAddress}`, 10, 50);
    doc.text(`Purchase Date: ${customer.purchaseDate}`, 10, 60);
    doc.text(`Total Items: ${customer.totalItems}`, 10, 70);
    doc.text(`Grand Total: $${grandTotal}`, 10, 80);
    doc.text(`Customer Points: ${customer.customerPoints}`, 10, 90);

    // Add purchased products table
    const tableColumnHeaders = [
      "#",
      "Product Name",
      "Code",
      "Category",
      "Brand",
      "Price",
      "Quantity",
      "Tax Rate",
      "Tax",
      "Total",
    ];

    const tableRows = customer?.purchasedProducts?.map((product, index) => {
    const tax = calculateTax(product.p_price, product.tax);
      return [
        index + 1,
        product.p_name,
        product.p_code,
        product.p_category,
        product.p_brand,
        `${product.p_price}`,
        product.quantity,
       `${product.tax}%`,
        `${tax *  product.quantity}`,
        `${tax * product.quantity + product.p_price *  product.quantity}`,
      ];
    });

    doc.autoTable({
      startY: 100,
      head: [tableColumnHeaders],
      body: tableRows,
    });

    // Save the PDF
    doc.save(`${customer.customerName}-purchased-products.pdf`);
  };

  return (
    <div>
      <CommonTopNab />
      <div>
        <div id="print-area" className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <p>
            <strong>Name:</strong> {customer.customerName}
          </p>
          <p>
            <strong>Email:</strong> {customer.customerEmail}
          </p>
          <p>
            <strong>Phone:</strong> {customer.customerPhone}
          </p>
          <p>
            <strong>Address:</strong> {customer.customerAddress}
          </p>
          <p>
            <strong>Purchase Date:</strong> {customer.purchaseDate}
          </p>
          <p>
            <strong>Total Items:</strong> {customer.totalItems}
          </p>
          <p>
            <strong>Grand Total:</strong> ${customer.grandTotal}
          </p>
          <p>
            <strong>Customer Points:</strong> {customer.customerPoints}
          </p>
        </div>

        <h3 className="text-xl font-bold mt-6">Purchased Products</h3>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-200 w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Product Code</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Brand</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Tax Rate</th>
                <th className="border border-gray-300 px-4 py-2">Tax</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
  {customer?.purchasedProducts?.length > 0 ? (
    customer?.purchasedProducts?.map((product, index) => {
      const tax = calculateTax(product.p_price, product.tax); // Use product.tax
      return (
        <tr key={index} className="text-center">
          <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
          <td className="border border-gray-300 px-4 py-2">{product.p_name}</td>
          <td className="border border-gray-300 px-4 py-2">{product.p_code}</td>
          <td className="border border-gray-300 px-4 py-2">{product.p_category}</td>
          <td className="border border-gray-300 px-4 py-2">{product.p_brand}</td>
          <td className="border border-gray-300 px-4 py-2">${product.p_price}</td>
          <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
          <td className="border border-gray-300 px-4 py-2">%{product.tax}</td> {/* Display tax rate */}
          <td className="border border-gray-300 px-4 py-2">${tax * product.quantity}</td>
          <td className="border border-gray-300 px-4 py-2">${(product.p_price * product.quantity + tax * product.quantity) }</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="10" className="border border-gray-300 px-4 py-2 text-center">
        No purchased products found.
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>

        
      </div>
      </div>
      {/* Buttons */}
      <div className="mt-6 flex gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Download PDF
          </button>
        </div>
    </div>
  );
}
