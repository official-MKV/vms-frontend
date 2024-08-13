import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import config from "../config";

const API_URL = config.REACT_APP_API_URL;

const VisitorCard = ({
  request,
  onApprove,
  onDecline,
  isApproving,
  isDeclining,
}) => (
  <div className="bg-white rounded-lg shadow-md max-h-[60vh] p-4 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)]">
    <h3 className="text-lg font-semibold mb-2">
      {request.visitor.lastName}, {request.visitor.firstName}
    </h3>
    <p className="text-sm text-gray-600 mb-1">
      {request.visitor.visitDate} • {request.visitor.visitTime}
    </p>
    <p className="text-sm text-gray-500 mb-1">
      {request.visitor.organization} • {request.visitor.reason}
    </p>
    <p className="text-sm text-gray-500 mb-1">
      no. guest: {request.visitor.numberOfGuest}
    </p>
    <p className="text-sm text-gray-500 mb-4 w-full text-nowrap overflow-clip text-ellipsis">
      Email: {request.visitor.email}
    </p>
    <div className="flex justify-between">
      <button
        onClick={() => onApprove(request.visitor.id)}
        disabled={isApproving || isDeclining}
        className={`w-[calc(50%-0.25rem)] py-2 px-4 rounded-md text-white ${
          isApproving || isDeclining
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isApproving ? (
          <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {isApproving ? "Approving" : "Approve"}
      </button>
      <button
        onClick={() => onDecline(request.visitor.id)}
        disabled={isApproving || isDeclining}
        className={`w-[calc(50%-0.25rem)] py-2 px-4 rounded-md text-white ${
          isApproving || isDeclining
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {isDeclining ? (
          <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {isDeclining ? "Declining" : "Decline"}
      </button>
    </div>
  </div>
);

function VisitorRequests({ pendingRequests }) {
  const queryClient = useQueryClient();

  const approveVisitor = useMutation({
    mutationFn: (visitorId) =>
      fetch(`${API_URL}/api/visitRequest/${visitorId}/accept`, {
        method: "POST",
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["visitorRequests", "Pending"]);
      queryClient.invalidateQueries(["visitorRequests", "Approved"]);
    },
  });

  const declineVisitor = useMutation({
    mutationFn: (visitorId) =>
      fetch(`${API_URL}/api/visitRequest/${visitorId}/decline`, {
        method: "POST",
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["visitorRequests", "Pending"]);
    },
  });

  const handleApprove = (visitorId) => {
    approveVisitor.mutate(visitorId);
  };

  const handleDecline = (visitorId) => {
    declineVisitor.mutate(visitorId);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Visitor Requests</h2>
      {pendingRequests?.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {pendingRequests.slice(0, 3).map((request, index) => (
            <VisitorCard
              key={index}
              request={request}
              onApprove={handleApprove}
              onDecline={handleDecline}
              isApproving={approveVisitor.isLoading}
              isDeclining={declineVisitor.isLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No visitor requests
        </div>
      )}
      <div className="mt-6">
        <Link to="/visitor-requests" className="text-blue-500 hover:underline">
          View All Requests
        </Link>
      </div>
    </div>
  );
}

export default VisitorRequests;
