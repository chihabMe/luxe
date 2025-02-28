"use client";

import type { getOrders } from "@/app/data/orders-data";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon,MapIcon, MapPinIcon, PhoneIcon, UserIcon } from "lucide-react";

interface Props {
  order: Awaited<ReturnType<typeof getOrders>>["data"][0];
  open: boolean;
  closeModal: () => void;
}

const OrderDetailsModal = ({ order, closeModal, open }: Props) => {
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-6xl h-[95vh] overflow-y-auto">
        <DialogHeader className="pt-4">
          <div className="gap-4 flex flex-col">
            <Card className="">
              <CardHeader className="">
                <CardTitle className="text-lg">Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="capitalize">
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-lg">{order.totalAmount}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {order.firstName} {order.lastName}
                  </span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{order.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span> {order.wilaya}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span> {order.address}</span>

                </div>
              </CardContent>
            </Card>
          </div>
        </DialogHeader>
        <div className="mt-6 space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.product.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                    <TableCell className="text-right">
                      {item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-semibold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {order.totalAmount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
