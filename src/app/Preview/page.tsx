"use client"

import Loader from "@/components/common/loader";
import { auth, firestore } from "@/firebase/config";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Preview from "../../components/PreviewNavbar";
import ProfilePreview from "../../components/ProfilePreview";

export default function PreviewPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const MemorizedPreview = React.memo(Preview);
  const MemorizedProfilePreview = React.memo(ProfilePreview);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        if (currentUser.emailVerified) {
          try {
            const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
            if (!userDoc.exists()) {
              const registrationData = localStorage.getItem("userCredentials");
              if (registrationData) {
                const { email, password } = JSON.parse(registrationData);
                await setDoc(doc(firestore, "users", currentUser.uid), { email, password });
                localStorage.removeItem("userCredentials");
              }
            }
            setUser(currentUser);
            router.push('/Home'); 
          } catch (error) {
            console.error("Error fetching or setting user data:", error);
          }
        } else {
          setUser(null);
          router.push('/');
        }
      } else {
        setUser(null);
        router.push('/');
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [router]);

  if (loading) return <Loader />;

  return (
    <div>
      {user ? (
        <>
          <MemorizedPreview />
          <MemorizedProfilePreview />
          <div className="h-[500px]"></div>
        </>
      ) : null}
    </div>
  );
}
