import { ScrollView, Alert, Modal, Pressable, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Tnc() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ textAlign: 'justify', fontSize: 16 }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>

                            <Text style={{ textAlign: 'justify', paddingTop: 20, fontSize: 16 }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>

                            <Text style={{ textAlign: 'justify', paddingTop: 20, fontSize: 16 }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>

                            <Text style={{ textAlign: 'justify', paddingTop: 20, fontSize: 16 }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Tnc

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    tnc: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        alignItems: 'center'
    }
});
