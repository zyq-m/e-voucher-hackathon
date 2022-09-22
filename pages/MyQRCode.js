import React from 'react'
import { View } from 'react-native'
import QRCode from 'react-qr-code'
import { useUserContext } from '../hooks'
import { globals } from '../styles'

const MyQRCode = () => {
  const { user } = useUserContext()

  return (
    <View style={[globals.container, { paddingHorizontal: 16, justifyContent: "center", alignItems: "center" }]}>
      <QRCode
        size={300}
        value={`https://e-voucher-api.herokuapp.com/api/${user.id}`}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      />
    </View>
  )
}

export default MyQRCode