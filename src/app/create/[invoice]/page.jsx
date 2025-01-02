"use client";

import ModalConfirm from "@/components/Modal/ModalConfirm";
import {
  Button,
  DatePicker,
  Input,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import terbilang from "angka-menjadi-terbilang";

const data = {
  azana: {
    name: "Azana",
    title: "Jl. Gatot Subroto, Cilacap",
    harga: 2850,
    alamat1: "AZANA ASIA HOTEL CILACAP",
    alamat2: "Jl. Gatot Subroto No. 120,",
    alamat3: "Sidanegara, Cilacap",
  },
  braga: {
    name: "Braga",
    title: "Jl. Soepardjo Roestam, Purwokerto",
    harga: 2500,
    alamat1: "BRAGA HOTEL PURWOKERTO",
    alamat2: "Jl. Soepardjo Roestam No.28,",
    alamat3: "Sokaraja Kulon, Purwokerto",
  },
  owabong: {
    name: "Owabong",
    title: "Jl. Raya Owabong, Purbalingga",
    harga: 2500,
    alamat1: "HOTEL OWABONG",
    alamat2: "Jl. Raya Owabong No.1,",
    alamat3: "Bojongsari, Purbalingga",
  },
};

const CreateInvoice = () => {
  const router = useRouter();
  const params = useParams();
  const id = params && params.invoice;
  const printRef = useRef(null);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const [date, setDate] = useState(null);
  const [faktur, setFaktur] = useState("");
  const [pcs, setPcs] = useState("");
  const [harga, setHarga] = useState();
  const [total, setTotal] = useState(0);
  const [template, setTemplate] = useState({});
  const [totalText, setTotalText] = useState("");
  const [loading, setLoading] = useState(true);

  const modalCreate = useDisclosure();
  const modalReset = useDisclosure();

  useEffect(() => {
    setTotal(pcs ? Number(pcs) * harga : 0);
  }, [pcs, harga]);

  useEffect(() => {
    setTotalText(terbilang(total));
  }, [total]);

  const handleReset = () => {
    setDate(null);
    setFaktur("");
    setPcs("");
    setHarga(data[id].harga);
    modalReset.onClose();
    setLoading(false);
  };

  const handleCreate = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = data;
    link.download = "screenshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    modalCreate.onClose();
    setLoading(false);

    router.push("/check");
  };

  useEffect(() => {
    setTemplate(data[id]);
    setHarga(data[id].harga);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const formatDateLong = (dateNow) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateNow);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID").format(angka);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner color="default" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
        <div className="bg-black p-8 flex gap-x-1 justify-between">
          <div className="flex flex-col">
            <p className="font-outline-1 text-transparent font-bold text-[32px] ">
              {template.name && template.name.toUpperCase()}
            </p>
            <p className="text-white font-bold text-[32px] ">
              {template.name && template.name.toUpperCase()}
            </p>
            <p className="font-outline-1 text-transparent font-bold text-[32px] ">
              {template.name && template.name.toUpperCase()}
            </p>
          </div>
          <div className="flex justify-end items-end">
            <p className="text-[10px] text-white text-right font-light">
              Jl. Soepardjo Roestam, Purwokerto
            </p>
          </div>
        </div>
        <div className="flex flex-col p-8">
          <div className="flex flex-col gap-y-6">
            <DatePicker
              label="Tanggal"
              labelPlacement="outside"
              variant="underlined"
              classNames={{ label: "text-xs" }}
              value={date}
              onChange={setDate}
            />
            <Input
              label="No Faktur"
              labelPlacement="outside"
              placeholder="No faktur"
              variant="underlined"
              radius="full"
              classNames={{ label: "text-xs" }}
              autoComplete="off"
              value={faktur}
              onValueChange={setFaktur}
            />
            <Input
              label="Pcs"
              labelPlacement="outside"
              placeholder="Pcs"
              variant="underlined"
              radius="full"
              classNames={{ label: "text-xs" }}
              autoComplete="off"
              type="number"
              value={pcs}
              onValueChange={setPcs}
            />
            <Input
              label="Harga/pcs"
              labelPlacement="outside"
              placeholder="Harga/pcs"
              variant="underlined"
              radius="full"
              classNames={{ label: "text-xs" }}
              autoComplete="off"
              type="number"
              value={harga}
              onValueChange={setHarga}
              startContent={<p>Rp</p>}
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-10">
            <Button
              variant="bordered"
              className="bg-black text-white"
              onPress={() => modalCreate.onOpen()}
            >
              Create
            </Button>
            <Button variant="bordered" onPress={() => modalReset.onOpen()}>
              Reset
            </Button>
            <Button
              color="danger"
              variant="bordered"
              onPress={() => router.push("/")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {/* Modal Confirm Retest */}
      {modalCreate.isOpen && (
        <ModalConfirm
          disclosure={{ ...modalCreate }}
          title="Create Invoice"
          description="Are you sure to create invoice with this data ?"
          onConfirm={handleCreate}
          type="success"
          confirmBtnText={"Create"}
          loading={loading}
        />
      )}

      {/* Modal Confirm Retest */}
      {modalReset.isOpen && (
        <ModalConfirm
          disclosure={{ ...modalReset }}
          title="Reset Data"
          description="Are you sure to reset data to default ?"
          onConfirm={handleReset}
          type="danger"
          confirmBtnText={"Reset"}
          loading={loading}
        />
      )}

      <div ref={printRef} className="w-[1000px] flex flex-col gap-y-5 p-10">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <img
              src={"/Logo_Transparent.png"}
              alt="logo"
              width={300}
              // height={100}
            />
            <div className="flex items-end gap-x-2">
              <p className="text-lg  whitespace-nowrap">FAKTUR No.</p>
              <div className="w-full">
                <p className="text-center ">{`${faktur}/${month}/${year}`}</p>
              </div>
            </div>
            <div className="flex items-end gap-x-2">
              <p className="text-lg  whitespace-nowrap">D/O No.</p>
              <div className="w-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-end gap-x-2 w-[300px]">
              <p className="text-xs font-semibold  whitespace-nowrap">
                TANGGAL
              </p>
              <div className="w-full">
                <p className="text-center">
                  {date ? formatDateLong(new Date(date)) : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-y-0 w-[300px]">
              <div className="w-full">
                <p className="text-xs  font-semibold">KEPADA YTH.</p>
              </div>
              <div className="w-full">
                <p className="">{template.alamat1}</p>
              </div>
              <div className="w-full">
                <p className="">{template.alamat2}</p>
              </div>
              <div className="w-full">
                <p className="">{template.alamat3}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table className="table-auto border-collapse w-full text-center text-sm">
            <thead>
              <tr>
                <th className="border-t-2 border-l-2 border-r border-b border-black w-[150px]">
                  <p className="">BANYAKNYA</p>
                </th>
                <th className="border-t-2 border-l border-r border-b border-black">
                  <p className="">NAMA BARANG</p>
                </th>
                <th className="border-t-2 border-l border-r border-b border-black">
                  <p className="">HARGA</p>
                </th>
                <th className="border-t-2 border-l border-r-2 border-b border-black">
                  <p className="">JUMLAH</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t border-l-2 border-r border-b border-black">
                  <p className="">{pcs} pcs</p>
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  <p className="">Slipper</p>
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  <p className="">{harga}</p>
                </td>
                <td className="border-t border-l border-r-2 border-b border-black">
                  <p className="">{formatRupiah(total)}</p>
                </td>
              </tr>
              {/* Baris kosong */}
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  <td className="border-t border-l-2 border-r border-b border-black">
                    &nbsp;
                  </td>
                  <td className="border-t border-l border-r border-b border-black">
                    &nbsp;
                  </td>
                  <td className="border-t border-l border-r border-b border-black">
                    &nbsp;
                  </td>
                  <td className="border-t border-l border-r-2 border-b border-black">
                    &nbsp;
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-t border-l-2 border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r border-b border-black text-start">
                  <p className="pl-2 ">Pembayaran harap ditransfer ke</p>
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r-2 border-b border-black">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td className="border-t border-l-2 border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r border-b border-black text-start">
                  <p className="pl-2 ">BANK BRI - SUTRISNO</p>
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r-2 border-b border-black">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td className="border-t border-l-2 border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r border-b border-black text-start">
                  <p className="pl-2 ">No.rek : 3726-01-025091-53-4</p>
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r-2 border-b border-black">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td className="border-t border-l-2 border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r border-b border-black">
                  &nbsp;
                </td>
                <td className="border-t border-l border-r-2 border-b border-black">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  className="border-t border-l-2 border-r border-b-2 border-black text-center font-semibold"
                >
                  <p className=" capitalize">{totalText} rupiah</p>
                </td>
                <td className="font-semibold border-t border-l border-r border-black">
                  <p className="">TOTAL RP</p>
                </td>
                <td className="border-t border-l border-r-2 border-b-2 border-black font-semibold">
                  <p className="">{formatRupiah(total)}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex">
          <div className="w-full flex justify-end mt-14 mr-32">
            <p className="font-semibold">SUTRISNO</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
