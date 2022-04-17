export default {
    run(text, picked) {

        let result = ''
        
        if (picked == 'channel') {
            result = `@${text}`
        } else {
            result = text
        }

        return result
    }
}