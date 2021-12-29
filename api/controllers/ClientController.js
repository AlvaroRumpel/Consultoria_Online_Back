const { ClientsServices } = require('../services')
const { tokens } = require('../middleware/index')
const { ChecksEmail, ForgotPassEmail } = require('./EmailController')

const clientsService = new ClientsServices()

function generateAddress (route, token) {
  const baseURL = process.env.BASE_URL
  return `${baseURL}/${route}/${token}`
}

class ClientController {
  static async login (req, res) {
    try {
      const accessToken = tokens.access.create(req.user.id)
      const refreshToken = await tokens.refresh.create(req.user.id)
      res.set('Authorization', accessToken)
      res.status(200).json({ refreshToken: refreshToken })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async logout (req, res) {
    try {
      const token = req.token
      await tokens.access.invalidate(token)
      res.status(204).send()
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async getAllClients (req, res) {
    try {
      const allClients = await clientsService.getAllRecords()
      return res.status(200).json(allClients)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getOneClient (req, res) {
    const { id } = req.params
    try {
      const client = await clientsService.getOneRecord(id)
      return res.status(200).json(client)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async createClient (req, res) {
    // role = 1 = default, role = 2 = admin, role = 3 = professional
    const client = { ...req.body, active: true, checkedEmail: false, role: '1' }
    try {
      const newClient = await clientsService.createRecord(client)

      const token = tokens.checkEmail.create(newClient.id)
      const address = generateAddress('clients/checkEmail', token)
      const emailCheck = new ChecksEmail(newClient, address)
      emailCheck.sendEmail().catch(console.log)

      return res.status(200).json(newClient)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async checkEmail (req, res) {
    const { id } = req.user
    try {
      await clientsService.modifyCheckedEmail(id)
      const clientChecked = await clientsService.getOneRecord(id)
      return res.status(200).json(clientChecked)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async updateClient (req, res) {
    const client = req.body
    const { id } = req.params
    try {
      await clientsService.updateRecordWithId(id, client)
      const clientUpdated = await clientsService.getOneRecord(id)
      return res.status(200).json(clientUpdated)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteClient (req, res) {
    const { id } = req.params
    try {
      await clientsService.deleteRecordWithId(id)
      return res.status(200).json(`Client com o Id ${id} foi deletado`)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async forgotPassword (req, res) {
    const { user } = req.body
    try {
      const client = await clientsService.getOneClientWithUser(user)
      const token = await tokens.forgotPassEmail.create(client.id)
      const address = generateAddress('clients/forgotPassword', token)
      const passEmail = new ForgotPassEmail(client, address)
      passEmail.sendEmail().catch(console.log)

      return res.status(201).json('enviado')
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async forgotPasswordRestore (req, res) {
    const { id } = req.user
    const { password } = req.body
    try {
      await clientsService.modifyPassword(id, password)
      const client = await clientsService.getOneRecord(id)
      return res.status(200).json(client)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = ClientController
