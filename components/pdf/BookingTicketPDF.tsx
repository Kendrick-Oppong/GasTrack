import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { Booking } from "@prisma/client";
import { formatDateTime } from "@/lib/dateTimeFormater";
import { QRImage } from ".";

interface UserBookingHistoryProps {
  booking: Booking;
  cylinderSize: string;
  cylinderPrice: number;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 5,
  },
  qrCodeContainer: {
    height: "auto",
    margin: "0 auto",
    maxWidth: 150,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "45%",
  },
  bookingInfo: {
    marginTop: 20,
  },
  bookingInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "medium",
    marginRight: 10,
  },
  value: {
    padding: 5,
    border: "1px solid #FFA500",
    borderRadius: 5,
  },
});

const BookingTicketPDF = ({
  booking,
  cylinderSize,
  cylinderPrice,
}: UserBookingHistoryProps) => {
  const getFormatedDate = formatDateTime(booking.createdAt);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.qrCodeContainer}>
          <QRImage bookingId={booking.id} />
        </View>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.header}>Dispatcher</Text>
            <Text style={styles.paragraph}>Kofi Mensah</Text>
            <Text style={styles.paragraph}>kofi.mensah3@gmail.com</Text>
            <Text style={styles.paragraph}>0542282292</Text>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.header}>Customer (You)</Text>
            <Text style={styles.paragraph}>{booking.fullName}</Text>
            <Text style={styles.paragraph}>{booking.email}</Text>
            <Text style={styles.paragraph}>{booking.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.bookingInfo}>
          <Text style={styles.header}>Booking Information</Text>
          <View style={styles.bookingInfoItem}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{booking.status}</Text>
          </View>
          <View style={styles.bookingInfoItem}>
            <Text style={styles.label}>Weight:</Text>
            <Text>{cylinderSize}</Text>
          </View>
          <View style={styles.bookingInfoItem}>
            <Text style={styles.label}>Price:</Text>
            <Text>{cylinderPrice} Cedis</Text>
          </View>
          <View style={styles.bookingInfoItem}>
            <Text style={styles.label}>Booking Date:</Text>
            <Text>{getFormatedDate}</Text>
          </View>
          <View style={styles.bookingInfoItem}>
            <Text style={styles.label}>Payment Mode:</Text>
            <Text>Cash - Pay on Delivery</Text>
          </View>
          <View style={styles.bookingInfoItem}>
            <Text style={styles.label}>Expected Delivery Date:</Text>
            <Text>Same day</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BookingTicketPDF;
