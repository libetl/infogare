const blackOrWhite = color => {
    const red = parseInt(color.substring(0, 2), 16)
    const green = parseInt(color.substring(2, 4), 16)
    const blue = parseInt(color.substring(4, 6), 16)

    return (red + green + blue) / 3.0 > 127 ? '000000' : 'FFFFFF'
}

export {blackOrWhite}