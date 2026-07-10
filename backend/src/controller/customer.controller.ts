import { Request, Response } from "express";
import Customer from "../models/customer.model";
import { errorResponse, successResponse } from "../utils/response";

// =======================
// Create Customer
// =======================
export const createCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      phone,
      alternatePhone,
      address,
      area,
      city,
      pincode,
      landmark,
      capacity,
      price,
      status,
      notes,
    } = req.body;

    // Required Field Validation
    if (!name || !phone || !address) {
      res.status(400).json({
        success: false,
        message: "Name, Phone and Address are required.",
      });
      return;
    }

    // Normalize Phone Number
    const normalizedPhone = phone.trim().replace(/\s+/g, "");
    console.log("Incoming Phone:", normalizedPhone);
    // Check Existing Customer
    const existingCustomer = await Customer.findOne({
      phone: normalizedPhone,
      isDeleted: false,
    });
    console.log("Existing Customer:", existingCustomer);

    if (existingCustomer) {
      res.status(409).json({
        success: false,
        message: "Customer already exists with this phone number.",
      });
      return;
    }

    // Create Customer
    const customer = await Customer.create({
      name: name.trim(),
      phone: normalizedPhone,
      alternatePhone: alternatePhone?.trim(),
      address: address.trim(),
      area: area?.trim(),
      city: city?.trim(),
      pincode: pincode?.trim(),
      landmark: landmark?.trim(),
      capacity,
      price,
      status,
      notes: notes?.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      data: customer,
    });
  } catch (error: any) {
    // MongoDB Duplicate Key Error
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: "Customer already exists with this phone number.",
      });
      return;
    }

    console.error("Create Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// =======================
// Get All Customers
// =======================
export const getCustomers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const status = req.query.status as string;

    const filter: any = {
      isDeleted: false,
    };

    // Search
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          area: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Status Filter
    if (status) {
      filter.status = status;
    }

    const total = await Customer.countDocuments(filter);

    const customers = await Customer.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: customers,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================
// Get Customer By Id
// =======================
export const getCustomerById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("Get Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================
// Update Customer
// =======================
export const updateCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const {
      name,
      phone,
      alternatePhone,
      address,
      area,
      city,
      pincode,
      landmark,
      capacity,
      price,
      status,
      notes,
    } = req.body;

    const customer = await Customer.findById(id);

    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
      return;
    }

    // Check duplicate phone (exclude current customer)
    if (phone) {
      const normalizedPhone = phone.trim().replace(/\s+/g, "");

      const existingCustomer = await Customer.findOne({
        phone: normalizedPhone,
        _id: { $ne: id },
      });

      if (existingCustomer) {
        res.status(409).json({
          success: false,
          message: "Customer already exists with this phone number.",
        });
        return;
      }

      customer.phone = normalizedPhone;
    }

    // Update Fields
    customer.name = name ?? customer.name;
    customer.alternatePhone = alternatePhone ?? customer.alternatePhone;
    customer.address = address ?? customer.address;
    customer.area = area ?? customer.area;
    customer.city = city ?? customer.city;
    customer.pincode = pincode ?? customer.pincode;
    customer.landmark = landmark ?? customer.landmark;
    customer.capacity = capacity ?? customer.capacity;
    customer.price = price ?? customer.price;
    customer.status = status ?? customer.status;
    customer.notes = notes ?? customer.notes;

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: customer,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: "Customer already exists with this phone number.",
      });
      return;
    }

    console.error("Update Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// =======================
// Delete Customer (Soft Delete)
// =======================
export const deleteCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Customer Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getCustomerOptions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const customers = await Customer.find()
      .select("_id name")
      .sort({ name: 1 })
      .lean();

    successResponse(res, "Customers fetched.", customers);
  } catch (error) {
    errorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
};
