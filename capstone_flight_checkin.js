function calculateBaggageSurcharge(ticket, baggageList) {
  let freeAllowance = ticket.freeAllowance || 20;

  if (ticket.membershipLevel === "Titan" || ticket.membershipLevel === "Gold" || ticket.membershipLevel === "Platinum" || ticket.membershipLevel === "Diamond") {
    freeAllowance += 10;
  }

  let totalWeight = 0;
  let totalBulkyFee = 0;
  let totalPetFee = 0;
  let detailRows = "";

  baggageList.forEach((bag, index) => {
    totalWeight += bag.weight;
    let bagSurcharge = 0;

    if (bag.isBulky) {
      totalBulkyFee += 200000;
    }
    if (bag.isPet) {
      totalPetFee += 500000;
    }

    detailRows += `Kiện ${index + 1}: ${bag.weight}kg | Cồng kềnh: ${bag.isBulky ? "Có" : "Không"} | Thú cưng: ${bag.isPet ? "Có" : "Không"}\n`;
  });

  let excessWeight = Math.max(0, totalWeight - freeAllowance);
  let weightSurcharge = 0;

  if (excessWeight > 0) {
    if (excessWeight <= 5) {
      weightSurcharge = excessWeight * 60000;
    } else {
      weightSurcharge = (5 * 60000) + ((excessWeight - 5) * 80000);
    }
  }

  let totalPayment = weightSurcharge + totalBulkyFee + totalPetFee;

  console.log("==================================================");
  console.log("             BIEN LAI THU PHI HANH LY             ");
  console.log("==================================================");
  console.log(`Ma ve (PNR)      : ${ticket.pnrCode}`);
  console.log(`Hanh khach       : ${ticket.passengerName}`);
  console.log(`Hang ve          : ${ticket.ticketClass}`);
  console.log(`Hoi vien         : ${ticket.membershipLevel || "Thuong"}`);
  console.log(`Han muc mien cuoc: ${freeAllowance} kg`);
  console.log(`Tong trong luong : ${totalWeight} kg`);
  console.log(`Trong luong vuot  : ${excessWeight} kg`);
  console.log("--------------------------------------------------");
  console.log(detailRows.trimEnd());
  console.log("--------------------------------------------------");
  console.log(`Cuoc qua cuoc    : ${weightSurcharge.toLocaleString("vi-VN")} VNĐ`);
  console.log(`Phu phi d.biet   : ${(totalBulkyFee + totalPetFee).toLocaleString("vi-VN")} VNĐ`);
  console.log("==================================================");
  console.log(`TONG TIEN THANH TOAN: ${totalPayment.toLocaleString("vi-VN")} VNĐ`);
  console.log("==================================================");

  return {
    totalWeight,
    freeAllowance,
    excessWeight,
    weightSurcharge,
    totalBulkyFee,
    totalPetFee,
    totalPayment
  };
}

const sampleTicket = {
  pnrCode: "VN1234",
  passengerName: "NGUYEN TAN PHONG",
  ticketClass: "Economy",
  membershipLevel: "Titan"
};

const sampleBaggage = [
  { weight: 15, isBulky: false, isPet: false },
  { weight: 10, isBulky: true, isPet: false }
];

calculateBaggageSurcharge(sampleTicket, sampleBaggage);