import React from 'react';
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 50,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        textShadow: '2px 2px 2px #ccc',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    list: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
        paddingLeft: 20,
    }
});

export default function PdfFile({ user }) {
    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.title}>STMIK Mardira Indonesia</Text>
                    <Text style={styles.text}>Kepada Yth,</Text>
                    <Text style={styles.text}>Bagian Penjagaan Bangunan,</Text>
                    <Text style={styles.text}>STMIK Mardira Indonesia,</Text>
                    <Text style={styles.text}>Di tempat</Text>

                    <Text style={styles.text}>Saya yang bertanda tangan di bawah ini:</Text>
                    <View style={styles.list}>
                        <Text> Nama: {user.user.username} </Text>
                        <Text> NIM: {user.user.nim} </Text>
                    </View>
                    <Text style={styles.text}>Bermaksud untuk meminjam ruangan:</Text>
                    <View style={styles.list}>
                        <Text> Nama Ruangan: {user.rooms.room_name} </Text>
                        <Text> Tanggal: {user.date} </Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Hormat Kami,</Text>
                        <Text style={styles.text}>Panitia Acara</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
